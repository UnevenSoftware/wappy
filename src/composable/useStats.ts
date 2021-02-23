import { ref, Ref } from 'vue'
import { useWebWorkerFn } from '@vueuse/core'

interface Stats {
  count?: number,
  usersStats?: Map<string, UserStats>,
}

interface UserStats {
  user: string,
  messages: string[],
  messagesCount?: number
}

interface Message {
  user?: string,
  datetime?: string,
  message?: string
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
  console.log(`Reading File: ${file.name} | ${(file.size / 1024).toFixed(2)}KB`);
  const content = await readFileAsync(file)
  const stats: Stats = {}

  // date: (\d{1,2}\/\d{1,2}\/\d{2,4})
  // time: (.*?)
  // user : (.*?)
  // message: (.+[^/]+\n)

  const re = /(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(.*?)\s-\s(.*?):\s(.+[^/]+\n)/gm
  const matches = [...content.matchAll(re)];

  stats.count = matches.length;
  stats.usersStats = new Map();
  for (const match of matches) {
    //const [matches] = [...line.matchAll(re)]; // todo: could 
    const msg: Message = {};
    const [_, date, time, user, message] = match;
    msg.datetime = `${date} ${time}`;
    msg.user = user;
    msg.message = message;

    if (stats.usersStats?.has(msg.user)) {
      stats.usersStats?.get(msg.user)?.messages.push(msg.message)
      //stats.users?.get(msg.user)?.messagesCount++;
    } else {
      const us: UserStats = { user: "", messages: [] };
      us.user = msg.user;
      us.messages.push(message);
      stats.usersStats?.set(msg.user, us);
    }
  }
  // console.log(stats)
  return stats;
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