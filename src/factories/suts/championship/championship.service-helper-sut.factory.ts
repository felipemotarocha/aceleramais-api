import {
  BonificationRepositoryStub,
  PenaltyRepositoryStub,
  ScoringSystemRepositoryStub,
  TeamRepositoryStub,
  ChampionshipRepositoryStub,
  BonificationRepositoryAbstract,
  ChampionshipRepositoryAbstract,
  PenaltyRepositoryAbstract,
  ScoringSystemRepositoryAbstract,
  TeamRepositoryAbstract,
  ChampionshipServiceHelperAbstract,
  ChampionshipServiceHelper
} from '.'
import {
  RaceClassificationRepositoryAbstract,
  RaceClassificationRepositoryStub,
  RaceRepositoryAbstract,
  RaceRepositoryStub
} from '../../../services/championship'

interface SutTypes {
  championshipRepositoryStub: ChampionshipRepositoryAbstract
  teamRepositoryStub: TeamRepositoryAbstract
  scoringSystemRepositoryStub: ScoringSystemRepositoryAbstract
  bonificationRepositoryStub: BonificationRepositoryAbstract
  penaltyRepositoryStub: PenaltyRepositoryAbstract
  raceRepositoryStub: RaceRepositoryAbstract
  raceClassificationRepositoryStub: RaceClassificationRepositoryAbstract
  sut: ChampionshipServiceHelperAbstract
}

const ChampionshipServiceHelperSutFactory = {
  make: (): SutTypes => {
    const teamRepositoryStub = new TeamRepositoryStub()
    const championshipRepositoryStub = new ChampionshipRepositoryStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const bonificationRepositoryStub = new BonificationRepositoryStub()
    const penaltyRepositoryStub = new PenaltyRepositoryStub()
    const raceRepositoryStub = new RaceRepositoryStub()
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()

    const sut = new ChampionshipServiceHelper(
      championshipRepositoryStub,
      teamRepositoryStub,
      scoringSystemRepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub
    )

    return {
      championshipRepositoryStub,
      teamRepositoryStub,
      scoringSystemRepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub,
      sut
    }
  }
}

export default ChampionshipServiceHelperSutFactory
