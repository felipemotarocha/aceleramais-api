export interface ChampionshipDriver {
  user?: string
  id?: string
  firstName?: string
  lastName?: string
  team?: string
  isRegistered: boolean
  bonifications?: {
    bonification: string
    race: string
  }[]
  penalties?: {
    bonification: string
    race: string
  }[]
}

export interface ChampionshipAdmin {
  user: string
  isCreator: boolean
}

interface Championship {
  id: string
  avatarImageUrl: string
  name: string
  description: string
  platform: string
  admins: ChampionshipAdmin[]
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
