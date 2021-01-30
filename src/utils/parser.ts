interface Message {
  date: string
  sender?: string | null
  text?: string | null
  type: 'message' | 'media' | 'other' |null// find
}
const parseLine = (line: string) : Message => {
  // const [date, ...message] = line.split('-')
  // const i = message.indexOf(':')
  // let sender

  // if(i >= 0) {
  //   sender = 
  // }

  


  // return {
  //   date,
  //   sender,
  // }


}

const parseFileContent = (fileContent: string): Message[] => {
  const lines = fileContent.split('\n')
  return lines.map(parseLine)
}


export { Message, parseFileContent }