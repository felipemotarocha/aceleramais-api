interface RaceClassification {
  id: string
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

export default RaceClassification