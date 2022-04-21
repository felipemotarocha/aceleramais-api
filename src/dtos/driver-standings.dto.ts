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
    isRemoved: boolean
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
    isRemoved: boolean
  }[]
}
