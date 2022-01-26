interface DriverStandings {
  championship: string
  standings: {
    user?: string
    userName?: string
    position: number
    isRegistered: boolean
  }[]
}

export default DriverStandings
