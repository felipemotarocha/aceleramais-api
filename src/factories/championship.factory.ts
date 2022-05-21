import { ChampionshipController } from '../controllers/championship/championship.controller'

// Models
import ChampionshipModel from '../models/championship.model'
import DriverStandingsModel from '../models/driver-standings.model'
import PenaltyModel from '../models/penalty.model'
import RaceClassificationModel from '../models/race-classification.model'
import RaceModel from '../models/race.model'
import ScoringSystemModel from '../models/scoring-system.model'
import TeamStandingsModel from '../models/team-standings.model'
import TeamModel from '../models/team.model'
import BonificationModel from '../models/bonification.model'

// Repositories
import { MongoChampionshipRepository } from '../repositories/championship/championship.repository'
import { MongoDriverStandingsRepository } from '../repositories/driver-standings/driver-standings.repository'
import { MongoPenaltyRepository } from '../repositories/penalty/penalty.repository'
import { MongoRaceClassificationRepository } from '../repositories/race-classification/race-classification.repository'
import MongoRaceRepository from '../repositories/race/race.repository'
import { MongoScoringSystemRepository } from '../repositories/scoring-system/scoring-system.repository'
import { MongoTeamStandingsRepository } from '../repositories/team-standings/team-standings.repository'
import { MongoTeamRepository } from '../repositories/team/team.repository'
import { MongoBonificationRepository } from '../repositories/bonification/bonification.repository'
import { S3Repository } from '../repositories/s3/s3.repository'

// Services
import { ChampionshipService } from '../services/championship/championship.service'
import { ChampionshipServiceHelperAbstract } from '../services/championship/championship.service-helper.types'
import ChampionshipServiceHelper from '../services/championship/championship.service-helper'

// Factories
import { makeDriverStandingsService } from './driver-standings.factory'
import { makeTeamStandingsService } from './team-standings.factory'
import { makeRaceClassificationService } from './race-classification.factory'

const makeChampionshipServiceHelper = (): ChampionshipServiceHelperAbstract => {
  const championshipRepository = new MongoChampionshipRepository(
    ChampionshipModel
  )
  const teamRepository = new MongoTeamRepository(TeamModel)

  const scoringSystemRepository = new MongoScoringSystemRepository(
    ScoringSystemModel
  )
  const raceRepository = new MongoRaceRepository(RaceModel)

  const raceClassificationRepository = new MongoRaceClassificationRepository(
    RaceClassificationModel
  )

  const bonificationRepository = new MongoBonificationRepository(
    BonificationModel
  )

  const penaltyRepository = new MongoPenaltyRepository(PenaltyModel)

  return new ChampionshipServiceHelper(
    championshipRepository,
    teamRepository,
    scoringSystemRepository,
    bonificationRepository,
    penaltyRepository,
    raceRepository,
    raceClassificationRepository
  )
}

export const makeChampionshipService = () => {
  const championshipRepository = new MongoChampionshipRepository(
    ChampionshipModel
  )

  const driverStandingsRepository = new MongoDriverStandingsRepository(
    DriverStandingsModel
  )

  const teamStandingsRepository = new MongoTeamStandingsRepository(
    TeamStandingsModel
  )

  const scoringSystemRepository = new MongoScoringSystemRepository(
    ScoringSystemModel
  )

  const s3Repository = new S3Repository()

  const championshipServiceHelper = makeChampionshipServiceHelper()

  return new ChampionshipService(
    championshipServiceHelper,
    championshipRepository,
    driverStandingsRepository,
    teamStandingsRepository,
    scoringSystemRepository,
    s3Repository
  )
}

const makeChampionshipController = (): ChampionshipController => {
  const raceClassificationService = makeRaceClassificationService()
  const driverStandingsService = makeDriverStandingsService()
  const teamStandingsService = makeTeamStandingsService()

  const championshipService = makeChampionshipService()

  return new ChampionshipController(
    championshipService,
    raceClassificationService,
    driverStandingsService,
    teamStandingsService
  )
}

export default makeChampionshipController
