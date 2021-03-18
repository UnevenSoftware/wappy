import { ref, Ref } from 'vue'
import { Stats } from '~/workers/stats'
import WorkerStats from '~/workers/stats?worker'

const getStats = (file: File): Promise<Stats> => {
  return new Promise((resolve, reject) => {
    const w = new WorkerStats()
    w.onmessage = (e) => {
      const [status, data] = e.data
      if (status === 'SUCCESS') {
        resolve(data)
      } else {
        reject(data)
      }
    }
    w.postMessage(file)
  })
}

interface IUseStats {
  readFile: (file: File) => Promise<void>
  loading: Ref<boolean>
  stats: Ref<Stats | undefined>
  error: Ref<Error | undefined>
  progress: Ref<number>
}

const useStats = (mock?: Stats): IUseStats => {

  const stats = ref<Stats | undefined>(mock)
  const loading = ref<boolean>(false)
  const progress = ref<number>(0) // 0 -> 1
  const error = ref<Error | undefined>(undefined)

  const readFile = async (file: File) => {
    console.time("readFile")
    error.value = undefined;
    loading.value = true;
    if (file.name.toLowerCase().endsWith('.txt')) {
      try {
        stats.value = await getStats(file);
      } catch (e) {
        console.error(e)
        error.value = e
      } finally {
        loading.value = false
      }
    } else {
      loading.value = false;
      console.error('Unsupported File Type')
      error.value = new Error('File Type not supported, please upload only txt Files.')
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