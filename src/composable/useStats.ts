import { ref, Ref } from 'vue'
import { useWebWorkerFn } from '@vueuse/core'


interface Stats {
  count: number
  users: UserStats[]
  hours: { [hour: string]: number }
}

interface UserStats {
  username: string
  messagesCount: number
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

  const normalizeTime = (time: string): string => {

    const i = time.indexOf(':') + 1
    const minutes = '00'//parseInt(time.substr(i, 2)) >= 30 ? '30' : '00'
    return time.substr(0, i) + minutes + time.substr(i + 2)
  }
  console.log(`Reading File: ${file.name} | ${(file.size / 1024).toFixed(2)}KB`);
  const content = await readFileAsync(file)

  // date: (\d{1,2}\/\d{1,2}\/\d{2,4})
  // time: (.*?)
  // user : (.*?)
  // message: (.+[^/]+\n)

  const re = /(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(.*?)\s-\s(.*?):\s(.+[^/]+\n)/gm
  const matches = [...content.matchAll(re)];
  const messagesCount: { [username: string]: number } = {}
  const hours: { [hour: string]: number } = {}

  for (const match of matches) {

    const [_, date, time, username, message] = match;

    //  message counter
    messagesCount[username] = (messagesCount[username] ?? 0) + 1

    // - hours distribuiton
    const t = normalizeTime(time)
    hours[t] = (hours[t] ?? 0) + 1


    // - top 10 words/emoji per person

    // - media over messages (%)
    // - response time per person (?)
  }

  const users = Object.entries(messagesCount).map((entry) => {
    const [username, messagesCount] = entry
    return {
      username,
      messagesCount
    }
  })

  return {
    count: matches.length,
    users, hours
  }
}

const { workerFn } = useWebWorkerFn(heavyStats, {})

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
      console.log(stats.value)
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