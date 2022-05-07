import {
  BonificationRepositoryStub,
  ChampionshipService,
  DriverStandingsRepositoryStub,
  PenaltyRepositoryStub,
  RaceClassificationRepositoryStub,
  RaceRepositoryStub,
  S3RepositoryStub,
  ScoringSystemRepositoryStub,
  TeamRepositoryStub,
  TeamStandingsRepositoryStub,
  ChampionshipRepositoryStub,
  ChampionshipServiceAbstract,
  TeamStandingsRepositoryAbstract,
  BonificationRepositoryAbstract,
  ChampionshipRepositoryAbstract,
  DriverStandingsRepositoryAbstract,
  PenaltyRepositoryAbstract,
  RaceClassificationRepositoryAbstract,
  RaceRepositoryAbstract,
  S3RepositoryAbstract,
  ScoringSystemRepositoryAbstract,
  TeamRepositoryAbstract
} from '.'

interface SutTypes {
  championshipRepositoryStub: ChampionshipRepositoryAbstract
  teamRepositoryStub: TeamRepositoryAbstract
  driverStandingsRepositoryStub: DriverStandingsRepositoryAbstract
  teamStandingsRepositoryStub: TeamStandingsRepositoryAbstract
  scoringSystemRepositoryStub: ScoringSystemRepositoryAbstract
  raceRepositoryStub: RaceRepositoryAbstract
  raceClassificationRepositoryStub: RaceClassificationRepositoryAbstract
  bonificationRepositoryStub: BonificationRepositoryAbstract
  penaltyRepositoryStub: PenaltyRepositoryAbstract
  s3RepositoryStub: S3RepositoryAbstract
  sut: ChampionshipServiceAbstract
}

const ChampionshipServiceSutFactory = {
  make: (): SutTypes => {
    const teamRepositoryStub = new TeamRepositoryStub()
    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const championshipRepositoryStub = new ChampionshipRepositoryStub()
    const teamStandingsRepositoryStub = new TeamStandingsRepositoryStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const raceRepositoryStub = new RaceRepositoryStub()
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()
    const bonificationRepositoryStub = new BonificationRepositoryStub()
    const penaltyRepositoryStub = new PenaltyRepositoryStub()
    const s3RepositoryStub = new S3RepositoryStub()

    const sut = new ChampionshipService(
      championshipRepositoryStub,
      teamRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      s3RepositoryStub
    )

    return {
      championshipRepositoryStub,
      teamRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub,
      s3RepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      sut
    }
  }
}

export default ChampionshipServiceSutFactory
