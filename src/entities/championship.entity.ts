export interface ChampionshipDriver {
  user?: string
  userName?: string
  team?: string
  isRegistered: boolean
}

interface Championship {
  id: string
  avatarImageUrl: string
  name: string
  description: string
  platform: string
  races: string[]
  drivers: ChampionshipDriver[]
  driverStandings: string
  teamStandings: string
  scoringSystem: string
}

export default Championship
