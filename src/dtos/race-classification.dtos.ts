export interface CreateRaceClassificationDto {
  race: string
  classification: {
    position: number
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    team: string
    isRegistered: boolean
    isRemoved: boolean
    hasFastestLap: boolean
    hasPolePosition: boolean
  }[]
}

export interface UpdateRaceClassificationDto {
  classification: {
    position: number
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    team?: string
    isRegistered: boolean
    isRemoved: boolean
    hasFastestLap: boolean
    hasPolePosition: boolean
  }[]
}
