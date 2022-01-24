export interface ChampionshipDriver {
  user: string
  team: string
}

interface Championship {
  id: string
  name: string
  description: string
  platform: string
  races: string[]
  drivers: ChampionshipDriver[]
  driverStandings: string
  teamStandings: string
  scoringSystem: string
}

export default Championship
