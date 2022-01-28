export interface CreateChampionshipDto {
  name: string
  description: string
  platform: string
  avatarImageUrl?: string
  races: {
    startDate: string
    track: string
  }[]
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
  scoringSystem: {
    [key: string]: number
  }
}

export interface CreateChampionshipMongoDto {
  name: string
  description: string
  platform: string
  avatarImageUrl?: string
  races: string[]
  teams?: string[]
  drivers?: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
  }[]
  scoringSystem: string
  driverStandings: string
  teamStandings: string
}
