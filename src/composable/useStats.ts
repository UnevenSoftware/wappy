import { ref, Ref } from 'vue'
import { useWebWorkerFn } from '@vueuse/core'
import { defineConfig } from 'vite'


interface Stats {
  count: number
  users: UserStats[]
  hours: { [hour: string]: number }
  words: { word: string, count: number }[]
  emoji: { word: string, count: number }[]
}

interface UserStats {
  username: string
  messagesCount: number
  mediaCount: number
  responseTime?: number
}

interface IUseStats {
  readFile: (file: File) => Promise<void>
  loading: Ref<boolean>
  stats: Ref<Stats | undefined>
  error: Ref<Error | undefined>
  progress: Ref<number>
}
const heavyStats = async (file: File): Promise<Stats> => {
  const readFileAsync = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsText(file)
    })
  }

  const loadStopWords = async (): Promise<string> => {
    const res = await fetch('https://raw.githubusercontent.com/stopwords-iso/stopwords-iso/master/stopwords-iso.json')
    const body = (await res.json()) as { [lang: string]: string[] }
    const stopWordLists = Object.values(body)
    return stopWordLists.reduce((ret, list) => [...ret, ...list], []).join('|')

  }

  const normalizeTime = (time: string): number => {
    const t = time.match(/(\d+)(?::(\d\d))?\s*([pP]?)/);
    if (t)
      return parseInt(t[1]) + (t[3] ? 12 : 0)
    return NaN
  }

  // responeTime Utils
  const rangeBetweenDates = (startDate: Date, stopDate:Date) => {
    return ((stopDate.getTime() - startDate.getTime()) / 1000)
  }


  console.log(`Reading File: ${file.name} | ${(file.size / 1024).toFixed(2)}KB`);
  const content = await readFileAsync(file)

  // date: (\d{1,2}\/\d{1,2}\/\d{2,4})
  // time: (.*?)
  // user : (.*?)
  // message: (.+[^/]+\n)
  const re = /(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(.*?)\s-\s(.*?):\s(.+[^/]+\n)/gm
  const matches = [...content.matchAll(re)];

  //
  const userCounters: { [username: string]: any } = {}

  const incrementCounter = (user: string, prop: string, amount = 1) => {
    if (!userCounters[user])
      userCounters[user] = {}
    if (!userCounters[user][prop])
      userCounters[user][prop] = 0

    userCounters[user][prop] += amount
  }
  // const messagesCount: { [username: string]: number } = {}
  // generates map like  {0:0, 1:0, ..., 23: 0}
  const hours: { [hour: number]: number } = Array.from<number>({ length: 24 }).reduce((map, value, i) => ({ ...map, [i]: 0 }), {})

  const wordsCount: { [word: string]: number } = {}
  const emojiCount: { [word: string]: number } = {}
  const stopWords = await loadStopWords()

  const countWords = (message: string) => {
    if (message.match(/<Media\s(.*?)>/gm)) return void 0

    const words = message.split(' ').filter(w => w.length > 2)

    const emojis = message.match(/\p{Emoji_Presentation}/gu);
    emojis?.forEach((w) => {
      emojiCount[w] = (emojiCount[w] ?? 0) + 1
    })

    words.forEach((w) => {
      if (stopWords.includes(w.toLowerCase()) || w.match(/\p{Emoji_Presentation}/gu)) return void 0
      wordsCount[w.toLowerCase()] = (wordsCount[w.toLowerCase()] ?? 0) + 1
    })
  }

  const prevDiff: {username:string, datetime: Date} = {};
  let firstRun = true;
  for (const match of matches) {

    const [_, date, time, username, message] = match;

    //  message counter
    if (message.match(/<Media\s(.*?)>/gm)) {
      incrementCounter(username, 'media')
    } else {
      incrementCounter(username, 'text')
    }

    // [DONE] - hours distribution
    const t = normalizeTime(time)
    hours[t]++

    // word counter
    countWords(message)

    // - top 10 words/emoji per person
    // - media over messages (%)
    // [WIP] - response time per person (?)
    if(!firstRun && prevDiff.username.toLowerCase() != username.toLowerCase()){
      const responseTime = rangeBetweenDates(new Date(prevDiff.datetime), new Date([date, time].join(' '))); // returns range in seconds
      if(responseTime <= 14400){ // 14400 seconds in 4 hour // filtering out responses after 4 hour
        incrementCounter(username, 'gloabalResponseTime', responseTime)
        incrementCounter(username, 'numberOfResponses');
      }
    } else if(firstRun) firstRun = false;
    
    prevDiff.username = username
    prevDiff.datetime = new Date([date, time].join(' '))
  }

  const users = Object.entries(userCounters).map((entry) => {
    const [username, counters] = entry
    const { media, text, gloabalResponseTime, numberOfResponses } = counters
    return {
      username: username,
      messagesCount: text,
      mediaCount: media,
      responseTime: (gloabalResponseTime / numberOfResponses).toFixed()
    }
  })

  const words = Object.entries(wordsCount).sort(([wa, a], [wb, b]) => b - a).slice(0, 10).map(([word, count]) => ({ word, count }))
  const emoji = Object.entries(emojiCount).sort(([wa, a], [wb, b]) => b - a).slice(0, 10).map(([word, count]) => ({ word, count }))

  return {
    count: matches.length,
    users, hours,
    words: words,
    emoji: emoji
  }
}

// { dependencies: [`${location.origin}/stats.js`] }
const { workerFn } = useWebWorkerFn(heavyStats,)

const useStats = (mock?: Stats): IUseStats => {

  const stats = ref<Stats | undefined>(mock)
  const loading = ref<boolean>(false)
  const progress = ref<number>(0) // 0 -> 1
  const error = ref<Error | undefined>(undefined)

  const readFile = async (file: File) => {
    console.time("readFile")
    loading.value = true
    try {
      stats.value = await workerFn(file);
    } catch (e) {
      console.error(e)
      error.value = e
    } finally {
      loading.value = false
    }
    console.timeEnd("readFile")
  }

  return {
    loading,
    stats,
    error,
    readFile,
    progress,
  }
}

export default useStats