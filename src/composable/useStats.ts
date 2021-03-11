import { ref, Ref } from 'vue'
import { useWebWorkerFn } from '@vueuse/core'

interface Stats {
  count: number
  messages: number
  medias: number
  users: UserStats[]
  hours: { [hour: string]: number }
  words: { word: string, count: number }[]
  emoji: { word: string, count: number }[]
}

interface UserStats {
  username: string
  messagesCount: number
  mediaCount: number
  responseTime: string
  startedConversations: number
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
  const rangeBetweenDates = (startDate: Date, stopDate: Date) => {
    return ((stopDate.getTime() - startDate.getTime()) / 1000)
  }


  const getThresold = (matches: RegExpMatchArray[]) => {
    let i = 0

    const MIN = (60 * 60 * 1), MAX = (60 * 60 * 7)
    const diffs = []
    const getDate = (index: number) => {
      const [_, date, time] = matches[index];
      return new Date(`${date} ${time}`)
    }

    while (i < matches.length - 2) {
      const diff = rangeBetweenDates(getDate(i), getDate(i + 1))
      if (diff > MIN && diff < MAX)
        diffs.push(diff)
      i++
    }

    const n = diffs.length
    const mean = diffs.reduce((a, b) => a + b) / n

    const standardDeviation = Math.sqrt(diffs.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    return mean//Math.max(standardDeviation, mean)
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

  let lastMessage: { username: string, datetime: Date } | undefined;
  const THRESHOLD = getThresold(matches)
  console.log('THRESHOLD', THRESHOLD / (60 * 60))

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

    // word/emoji counter
    countWords(message)

    // - response time & started startedConversations per person 

    const datetime = new Date([date, time].join(' '))
    //(60 * 60 * 2)

    if (!lastMessage) {
      incrementCounter(username, 'startedConversations');
    } else {
      const differentPerson = lastMessage.username.toLowerCase() != username.toLowerCase()
      const diffTime = rangeBetweenDates(new Date(lastMessage.datetime), datetime)



      // count startConversations
      if (diffTime > THRESHOLD) {
        incrementCounter(username, 'startedConversations');
      } else if (differentPerson) {
        // responseTime
        incrementCounter(username, 'gloabalResponseTime', diffTime)
        incrementCounter(username, 'numberOfResponses');
      }
    }

    lastMessage = {
      username,
      datetime
    }
  }

  const users = Object.entries(userCounters).map((entry) => {
    const [username, counters] = entry
    const { media, text, gloabalResponseTime, numberOfResponses, startedConversations = 0 } = counters
    return {
      username: username,
      messagesCount: text,
      mediaCount: media,
      responseTime: (gloabalResponseTime / numberOfResponses).toFixed(),
      startedConversations
    }
  })

  const words = Object.entries(wordsCount).sort(([wa, a], [wb, b]) => b - a).slice(0, 10).map(([word, count]) => ({ word, count }))
  const emoji = Object.entries(emojiCount).sort(([wa, a], [wb, b]) => b - a).slice(0, 10).map(([word, count]) => ({ word, count }))


  return {
    count: matches.length,
    messages: users.reduce((amount, el) => amount + (el.messagesCount || 0), 0),
    medias: users.reduce((amount, el) => amount + (el.mediaCount || 0), 0),
    users: users,
    hours: hours,
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