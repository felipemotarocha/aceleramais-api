import Bonification from './bonification.entity'
import DriverStandings from './driver-standings.entity'
import Penalty from './penalty.entity'
import Race from './race.entity'
import ScoringSystem from './scoring-system.entity'
import TeamStandings from './team-standings.entity'
import Team from './team.entity'
import User from './user.entity'

export interface ChampionshipDriver {
  user?: string | User
  id?: string
  firstName?: string
  lastName?: string
  team?: string | Team
  isRegistered: boolean
  bonifications: {
    bonification: string | Bonification
    race: string
  }[]
  penalties: {
    penalty: string | Penalty
    race: string
  }[]
  isRemoved: boolean
}

export interface ChampionshipAdmin {
  user: string | User
  isCreator: boolean
}

export interface ChampionshipPendentDriver {
  user: string | User
  team?: string | Team
}

interface Championship {
  id: string
  code: string
  avatarImageUrl: string
  name: string
  description: string
  platform: string
  admins: ChampionshipAdmin[]
  races: string[] | Race[]
  teams: string[] | Team[]
  drivers: ChampionshipDriver[]
  pendentDrivers: ChampionshipPendentDriver[]
  driverStandings: string | DriverStandings
  teamStandings: string | TeamStandings
  scoringSystem: string | ScoringSystem
  bonifications: string[] | Bonification[]
  penalties: string[] | Penalty[]
}

export default Championship
