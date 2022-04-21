// Repositories
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'
import { MongoChampionshipRepository } from '../repositories/championship/championship.repository'
import MongoRaceRepository from '../repositories/race/race.repository'

// Models
import RaceClassificationModel from '../models/race-classification.model'
import RaceModel from '../models/race.model'
import ChampionshipModel from '../models/championship.model'

// Services
import RaceClassificationService, {
  RaceClassificationServiceAbstract
} from '../services/race-classification/race-classification.service'

// Controllers
import RaceClassificationController, {
  RaceClassificationControllerAbstract
} from '../controllers/race-classification/race-classification.controller'

// Factories
import { makeTeamStandingsService } from './team-standings.factory'
import { makeDriverStandingsService } from './driver-standings.factory'
import { makeRaceService } from './race.factory'

export const makeRaceClassificationService =
  (): RaceClassificationServiceAbstract => {
    const raceRepository = new MongoRaceRepository(RaceModel)

    const raceClassificationRepository = new MongoRaceClassificationRepository(
      RaceClassificationModel
    )
    const championshipRepository = new MongoChampionshipRepository(
      ChampionshipModel
    )

    return new RaceClassificationService(
      raceClassificationRepository,
      raceRepository,
      championshipRepository
    )
  }

const makeRaceClassificationController =
  (): RaceClassificationControllerAbstract => {
    const driverStandingsService = makeDriverStandingsService()

    const teamStandingsService = makeTeamStandingsService()

    const raceService = makeRaceService()

    const raceClassificationService = makeRaceClassificationService()

    return new RaceClassificationController(
      raceClassificationService,
      driverStandingsService,
      teamStandingsService,
      raceService
    )
  }

export default makeRaceClassificationController
