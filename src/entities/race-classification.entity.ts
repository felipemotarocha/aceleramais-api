interface RaceClassfication {
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

export default RaceClassfication
