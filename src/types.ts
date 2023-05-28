export interface Rank {
  count: number
  players: Record<string, number>
}

export interface Setup {
  id: string
  label: string
  author: string
  baseurl: string
  players: Record<string, string>
}
