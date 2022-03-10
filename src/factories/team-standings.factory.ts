// Repositories
import { MongoTeamStandingsRepository } from '../repositories/team-standings/team-standings.repository'
import { MongoChampionshipRepository } from '../repositories/championship/championship.repository'
import { MongoDriverStandingsRepository } from '../repositories/driver-standings/driver-standings.repository'

// Models
import TeamStandingsModel from '../models/team-standings.model'
import DriverStandingsModel from '../models/driver-standings.model'
import ChampionshipModel from '../models/championship.model'

// Services
import { TeamStandingsService } from '../services/team-standings/team-standings.service'

// Controllers
import { TeamStandingsController } from '../controllers/team-standings/team-standings.controller'

const makeTeamStandingsController = () => {
  const teamStandingsRepository = new MongoTeamStandingsRepository(
    TeamStandingsModel
  )
  const championshipRepository = new MongoChampionshipRepository(
    ChampionshipModel
  )

  const driverStandingsRepository = new MongoDriverStandingsRepository(
    DriverStandingsModel
  )

  const teamStandingsService = new TeamStandingsService(
    teamStandingsRepository,
    driverStandingsRepository,
    championshipRepository
  )

  return new TeamStandingsController(teamStandingsService)
}

export default makeTeamStandingsController
