const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsText(file)
  })
}

const loadStopWords = async () => {
  const res = await fetch('https://raw.githubusercontent.com/stopwords-iso/stopwords-iso/master/stopwords-iso.json')
  const body = (await res.json())
  const stopWordLists = Object.values(body)
  return stopWordLists.reduce((ret, list) => [...ret, ...list], []).join('|')

}

const normalizeTime = (time) => {
  const t = time.match(/(\d+)(?::(\d\d))?\s*([pP]?)/);
  if (t)
    return parseInt(t[1]) + (t[3] ? 12 : 0)
  return NaN
}