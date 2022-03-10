import Race from './race.entity'
import Team from './team.entity'
import User from './user.entity'

interface RaceClassification {
  id: string
  race: string | Race
  classification: {
    position: number
    user?: string | User
    id?: string
    firstName?: string
    lastName?: string
    team: string | Team
    isRegistered: boolean
    hasFastestLap: boolean
    hasPolePosition: boolean
  }[]
}

export default RaceClassification
