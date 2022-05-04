import { TeamController } from '../controllers/team/team.controller'

// Models
import TeamModel from '../models/team.model'

// Repositories
import { MongoTeamRepository } from '../repositories/team/team.repository'

// Services
import { TeamService } from '../services/team/team.service'

const makeTeamController = () => {
  const teamRepository = new MongoTeamRepository(TeamModel)

  const teamService = new TeamService(teamRepository)

  return new TeamController(teamService)
}

export default makeTeamController
