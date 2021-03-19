import { ref, Ref } from 'vue'
import * as zip from "@zip.js/zip.js";
import { Stats } from '~/workers/stats'
// import WorkerStats from '~/workers/stats?worker&inline'
// console.log(WorkerStats)

const readFileAsync = async (file: File): Promise<string> => {

  if (file.type == 'application/zip') {
    // create a BlobReader to read with a ZipReader the zip from a Blob object
    const reader = new zip.ZipReader(new zip.BlobReader(file));

    // get all entries from the zip
    const entries = await reader.getEntries();
    const textFile = entries.find(e => e.filename.endsWith('.txt'))
    if (textFile != null) {
      return await textFile.getData(new zip.TextWriter(), { useWebWorkers: false })
    }
    // close the ZipReader
    await reader.close();
  }

  return file.slice(0, file.size).text()
}

const getStats = (file: File): Promise<Stats> => {
  return new Promise(async (resolve, reject) => {
    const w = new Worker('/worker-stats.js')
    w.onmessage = (e) => {
      const [status, data] = e.data
      if (status === 'SUCCESS') {
        resolve(data)
      } else {
        reject(data)
      }
    }
    w.postMessage(await readFileAsync(file))
  })
}

interface IUseStats {
  readFile: (file: File) => Promise<void>
  loading: Ref<boolean>
  stats: Ref<Stats | undefined>
  error: Ref<Error | undefined>
  progress: Ref<number>
}

const isValidFile = (f: File): boolean => {
  return ['text/plain', 'application/zip'].includes(f.type)
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
    if (isValidFile(file)) {
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
      error.value = new Error('File Type not supported, please upload only .txt or.zip files.')
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