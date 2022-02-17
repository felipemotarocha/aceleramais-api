import DriverStandings from './driver-standings.entity'
import Race from './race.entity'
import ScoringSystem from './scoring-system.entity'
import TeamStandings from './team-standings.entity'
import Team from './team.entity'

export interface ChampionshipDriver {
  user?: string
  id?: string
  firstName?: string
  lastName?: string
  team?: string | Team
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
  races: string[] | Race[]
  teams: string[] | Team[]
  drivers: ChampionshipDriver[]
  driverStandings: string | DriverStandings
  teamStandings: string | TeamStandings
  scoringSystem: string | ScoringSystem
  bonifications: string[]
  penalties: string[]
}

export default Championship
