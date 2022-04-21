import Team from './team.entity'

interface DriverStandings {
  id: string
  championship: string
  standings: {
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    team?: string | Team
    position: number
    points: number
    isRegistered: boolean
    isRemoved: boolean
  }[]
}

export default DriverStandings
