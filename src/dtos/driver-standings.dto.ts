export interface CreateDriverStandingsDto {
  championship: string
  standings: {
    user?: string
    userName?: string
    position: number
    isRegistered: boolean
  }[]
}

export interface UpdateDriverStandingsDto {
  standings: {
    user?: string
    userName?: string
    position: number
    isRegistered: boolean
  }[]
}
