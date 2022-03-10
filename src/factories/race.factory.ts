// Repositories
import MongoRaceRepository from '../repositories/race/race.repository'
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'

// Models
import RaceModel from '../models/race.model'
import RaceClassificationModel from '../models/race-classification.model'

// Services
import RaceService from '../services/race/race.service'

// Controllers
import RaceController from '../controllers/race/race.controller'

export const makeRaceService = () => {
  const raceRepository = new MongoRaceRepository(RaceModel)
  const raceClassificationRepository = new MongoRaceClassificationRepository(
    RaceClassificationModel
  )

  return new RaceService(raceRepository, raceClassificationRepository)
}

export const makeRaceController = () => {
  const raceService = makeRaceService()

  return new RaceController(raceService)
}
