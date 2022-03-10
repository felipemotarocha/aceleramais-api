// Repositories
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'

// Models
import RaceClassificationModel from '../models/race-classification.model'

// Services
import RaceClassificationService from '../services/race-classification/race-classification.service'

// Controllers
import RaceClassificationController from '../controllers/race-classification/race-classification.controller'

// Factories
import { makeTeamStandingsService } from './team-standings.factory'
import { makeDriverStandingsService } from './driver-standings.factory'
import { makeRaceService } from './race.factory'

const makeRaceClassificationController = () => {
  const driverStandingsService = makeDriverStandingsService()

  const teamStandingsService = makeTeamStandingsService()

  const raceService = makeRaceService()

  const raceClassificationRepository = new MongoRaceClassificationRepository(
    RaceClassificationModel
  )

  const raceClassificationService = new RaceClassificationService(
    raceClassificationRepository
  )

  return new RaceClassificationController(
    raceClassificationService,
    driverStandingsService,
    teamStandingsService,
    raceService
  )
}

export default makeRaceClassificationController
