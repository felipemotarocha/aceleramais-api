// Repositories
import { MongoDriverStandingsRepository } from '../repositories/driver-standings/driver-standings.repository'
import MongoRaceRepository from '../repositories/race/race.repository'
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'
import { MongoScoringSystemRepository } from '../repositories/scoring-system/scoring-system.repository'
import { MongoChampionshipRepository } from '../repositories/championship/championship.repository'

// Models
import DriverStandingsModel from '../models/driver-standings.model'
import RaceModel from '../models/race.model'
import RaceClassificationModel from '../models/race-classification.model'
import ScoringSystemModel from '../models/scoring-system.model'
import ChampionshipModel from '../models/championship.model'

// Services
import { DriverStandingsService } from '../services/driver-standings/driver-standings.service'

// Controllers
import { DriverStandingsController } from '../controllers/driver-standings/driver-standings.controller'

export const makeDriverStandingsService = () => {
  const driverStandingsRepository = new MongoDriverStandingsRepository(
    DriverStandingsModel
  )
  const raceRepository = new MongoRaceRepository(RaceModel)
  const raceClassificationRepository = new MongoRaceClassificationRepository(
    RaceClassificationModel
  )
  const scoringSystemRepository = new MongoScoringSystemRepository(
    ScoringSystemModel
  )

  const championshipRepository = new MongoChampionshipRepository(
    ChampionshipModel
  )

  const driverStandingsService = new DriverStandingsService(
    driverStandingsRepository,
    raceRepository,
    raceClassificationRepository,
    scoringSystemRepository,
    championshipRepository
  )

  return driverStandingsService
}

export const makeDriverStandingsController = () => {
  const driverStandingsService = makeDriverStandingsService()

  return new DriverStandingsController(driverStandingsService)
}
