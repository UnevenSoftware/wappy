import { ref, Ref } from 'vue'
import { useWebWorkerFn } from '@vueuse/core'

interface Stats {
  count: number
}

interface IUseStats {
  readFile: (file: File) => Promise<void>
  loading: Ref<boolean>
  stats: Ref<Stats | undefined>
  error: Ref<Error | undefined>
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

  const content = await readFileAsync(file)
  const lines = content.split("\n")
  return { count: lines.length }
}

const { workerFn } = useWebWorkerFn(heavyStats)



const useStats = (mock?: Stats): IUseStats => {
  const loading = ref<boolean>(false)
  const stats = ref<Stats | undefined>(mock)
  const error = ref<Error | undefined>(undefined)

  const readFile = async (file: File) => {
    loading.value = true

    try {
      stats.value = await workerFn(file)
      console.log(stats.value)
    } catch (e) {
      console.error(e)
      error.value = e
    } finally {
      loading.value = false
    }

  }

  return {
    loading,
    stats,
    error,
    readFile
  }
}

export default useStats