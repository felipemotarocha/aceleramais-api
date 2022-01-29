import { ChampionshipController } from '../controllers/championship/championship.controller'

// Models
import ChampionshipModel from '../models/championship.model'
import DriverStandingsModel from '../models/driver-standings.model'
import RaceClassificationModel from '../models/race-classification.model'
import RaceModel from '../models/race.model'
import ScoringSystemModel from '../models/scoring-system.model'
import TeamStandingsModel from '../models/team-standings.model'
import TeamModel from '../models/team.model'

// Repositories
import { MongoChampionshipRepository } from '../repositories/championship/championship.repository'
import { MongoDriverStandingsRepository } from '../repositories/driver-standings/driver-standings.repository'
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'
import MongoRaceRepository from '../repositories/race/race.repository'
import { MongoScoringSystemRepository } from '../repositories/scoring-system/scoring-system.repository'
import { MongoTeamStandingsRepository } from '../repositories/team-standings/team-standings.repository'
import { MongoTeamRepository } from '../repositories/team/team.repository'

// Services
import { ChampionshipService } from '../services/championship/championship.service'

const makeChampionshipController = (): ChampionshipController => {
  const championshipRepository = new MongoChampionshipRepository(
    ChampionshipModel
  )
  const teamRepository = new MongoTeamRepository(TeamModel)
  const driverStandingsRepository = new MongoDriverStandingsRepository(
    DriverStandingsModel
  )
  const teamStandingsRepository = new MongoTeamStandingsRepository(
    TeamStandingsModel
  )
  const scoringSystemRepository = new MongoScoringSystemRepository(
    ScoringSystemModel
  )
  const raceRepository = new MongoRaceRepository(RaceModel)
  const raceClassificationRepository = new MongoRaceClassificationRepository(
    RaceClassificationModel
  )

  const championshipService = new ChampionshipService(
    championshipRepository,
    teamRepository,
    driverStandingsRepository,
    teamStandingsRepository,
    scoringSystemRepository,
    raceRepository,
    raceClassificationRepository
  )

  return new ChampionshipController(championshipService)
}

export default makeChampionshipController
