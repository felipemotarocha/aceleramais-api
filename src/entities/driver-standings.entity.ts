interface DriverStandings {
  id: string
  championship: string
  standings: {
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    team?: string
    position: number
    points: number
    isRegistered: boolean
  }[]
}

export default DriverStandings