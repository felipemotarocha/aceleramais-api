// Repositories
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'

// Models
import RaceClassificationModel from '../models/race-classification.model'

// Services
import RaceClassificationService from '../services/race-classification/race-classification.service'

// Controllers
import RaceClassificationController from '../controllers/race-classification/race-classification.controller'

const makeRaceClassificationController = () => {
  const raceClassificationRepository = new MongoRaceClassificationRepository(
    RaceClassificationModel
  )

  const raceClassificationService = new RaceClassificationService(
    raceClassificationRepository
  )

  return new RaceClassificationController(raceClassificationService)
}

export default makeRaceClassificationController
