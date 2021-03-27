interface Stats {
  filename: string,
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

export { Stats, UserStats }