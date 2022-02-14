export interface ChampionshipDriver {
  user?: string
  firstName?: string
  lastName?: string
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
  admins: string[]
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
