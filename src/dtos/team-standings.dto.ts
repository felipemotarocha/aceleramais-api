export interface CreateTeamStandingsDto {
  championship: string
  standings: {
    team: string
    position: number
    points: number
  }[]
}

export interface UpdateTeamStandingsDto {
  standings: {
    team: string
    position: number
    points: number
  }[]
}
