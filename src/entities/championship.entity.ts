export interface ChampionshipDriver {
  user?: string
  userName?: string
  team?: string
  isRegistered: boolean
  bonifications?: {
    bonification: string
    race: string
  }[]
}

interface Championship {
  id: string
  avatarImageUrl: string
  name: string
  description: string
  platform: string
  races: string[]
  teams: string[]
  drivers: ChampionshipDriver[]
  driverStandings: string
  teamStandings: string
  scoringSystem: string
  bonifications: string[]
  penalties: string[]
}

export default Championship
