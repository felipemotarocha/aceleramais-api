// Repositories
import { MongoDriverStandingsRepository } from '../repositories/driver-standings/driver-standings.repository'
import MongoRaceRepository from '../repositories/race/race.repository'
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'
import { MongoScoringSystemRepository } from '../repositories/scoring-system/scoring-system.repository'
import { MongoBonificationRepository } from '../repositories/bonification/bonification.repository'
import { MongoPenaltyRepository } from '../repositories/penalty/penalty.repository'

// Models
import DriverStandingsModel from '../models/driver-standings.model'
import RaceModel from '../models/race.model'
import RaceClassificationModel from '../models/race-classification.model'
import ScoringSystemModel from '../models/scoring-system.model'
import BonificationModel from '../models/bonification.model'
import PenaltyModel from '../models/penalty.model'

// Services
import { DriverStandingsService } from '../services/driver-standings/driver-standings.service'

// Controllers
import { DriverStandingsController } from '../controllers/driver-standings/driver-standings.controller'

const makeDriverStandingsController = () => {
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
  const bonificationRepository = new MongoBonificationRepository(
    BonificationModel
  )
  const penaltyRepository = new MongoPenaltyRepository(PenaltyModel)

  const driverStandingsService = new DriverStandingsService(
    driverStandingsRepository,
    raceRepository,
    raceClassificationRepository,
    scoringSystemRepository,
    bonificationRepository,
    penaltyRepository
  )

  return new DriverStandingsController(driverStandingsService)
}

export default makeDriverStandingsController
