// Repositories
import { MongoTeamStandingsRepository } from '../repositories/team-standings/team-standings.repository'

// Models
import TeamStandingsModel from '../models/team-standings.model'

// Services
import { TeamStandingsService } from '../services/team-standings/team-standings.service'

// Controllers
import { TeamStandingsController } from '../controllers/team-standings/team-standings.controller'

const makeTeamStandingsController = () => {
  const teamStandingsRepository = new MongoTeamStandingsRepository(
    TeamStandingsModel
  )

  const teamStandingsService = new TeamStandingsService(teamStandingsRepository)

  return new TeamStandingsController(teamStandingsService)
}

export default makeTeamStandingsController
