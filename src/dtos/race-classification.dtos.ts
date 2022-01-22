export interface CreateRaceClassificationDto {
  race: string
  classification: {
    position: number
    user?: string
    userName?: string
    team: string
    isRegistered: boolean
    hasFastestLap: boolean
    hasPolePosition: boolean
  }[]
}

export interface UpdateRaceClassificationDto {
  race: string
  classification: {
    position: number
    user?: string
    userName?: string
    team: string
    isRegistered: boolean
    hasFastestLap: boolean
    hasPolePosition: boolean
  }[]
}
