export interface CreateChampionshipDto {
  name: string
  description: string
  platform: string
  avatarImageUrl?: string
  races: {
    startDate: string
    track: string
  }
  teams?: {
    name: string
    color?: string
  }[]
  drivers?: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
  }[]
}
