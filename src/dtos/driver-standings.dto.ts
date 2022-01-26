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
  championship: string
  standings: {
    user?: string
    userName?: string
    position: number
    isRegistered: boolean
  }[]
}
