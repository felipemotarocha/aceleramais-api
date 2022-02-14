export interface CreateDriverStandingsDto {
  championship: string
  standings: {
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    position: number
    points: number
    isRegistered: boolean
  }[]
}

export interface UpdateDriverStandingsDto {
  standings: {
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    position: number
    points: number
    isRegistered: boolean
  }[]
}
