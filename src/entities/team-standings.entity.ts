interface TeamStandings {
  id: string
  championship: string
  standings: {
    team: string
    position: number
    points: number
  }[]
}

export default TeamStandings
