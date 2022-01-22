export interface CreateRaceClassificationDto {
  race: string
  classification: {
    position: number
    driver: {
      user?: string
      userName?: string
      team: string
      isRegisterd: boolean
    }
    hasFastestLap: boolean
    hasPolePosition: boolean
  }[]
}

export interface UpdateRaceClassificationDto {
  race: string
  classification: {
    position: number
    driver: {
      user?: string
      userName?: string
      team: string
      isRegisterd: boolean
    }
    hasFastestLap: boolean
    hasPolePosition: boolean
  }[]
}
