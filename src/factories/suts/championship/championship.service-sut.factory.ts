import {
  ChampionshipService,
  DriverStandingsRepositoryStub,
  S3RepositoryStub,
  ScoringSystemRepositoryStub,
  TeamStandingsRepositoryStub,
  ChampionshipRepositoryStub,
  ChampionshipServiceAbstract,
  TeamStandingsRepositoryAbstract,
  ChampionshipRepositoryAbstract,
  DriverStandingsRepositoryAbstract,
  S3RepositoryAbstract,
  ScoringSystemRepositoryAbstract,
  ChampionshipServiceHelperAbstract,
  ChampionshipServiceHelperStub
} from '.'

interface SutTypes {
  championshipServiceHelperStub: ChampionshipServiceHelperAbstract
  championshipRepositoryStub: ChampionshipRepositoryAbstract
  driverStandingsRepositoryStub: DriverStandingsRepositoryAbstract
  teamStandingsRepositoryStub: TeamStandingsRepositoryAbstract
  scoringSystemRepositoryStub: ScoringSystemRepositoryAbstract
  s3RepositoryStub: S3RepositoryAbstract
  sut: ChampionshipServiceAbstract
}

const ChampionshipServiceSutFactory = {
  make: (): SutTypes => {
    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const championshipRepositoryStub = new ChampionshipRepositoryStub()
    const teamStandingsRepositoryStub = new TeamStandingsRepositoryStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const s3RepositoryStub = new S3RepositoryStub()

    const championshipServiceHelperStub = new ChampionshipServiceHelperStub()

    const sut = new ChampionshipService(
      championshipServiceHelperStub,
      championshipRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub,
      s3RepositoryStub
    )

    return {
      championshipServiceHelperStub,
      championshipRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub,
      s3RepositoryStub,
      sut
    }
  }
}

export default ChampionshipServiceSutFactory
