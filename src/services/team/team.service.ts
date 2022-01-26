import { CreateTeamDto, UpdateTeamDto } from '../../dtos/team.dtos'
import Team from '../../entities/team.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'

export interface TeamServiceAbstract {
  create(createTeamDto: CreateTeamDto): Promise<Team>
  getAll(championship: string): Promise<Team[]>
  update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>
  delete(id: string): Promise<Team>
}

export class TeamService implements TeamServiceAbstract {
  private readonly teamRepository: TeamRepositoryAbstract

  constructor(teamRepository: TeamRepositoryAbstract) {
    this.teamRepository = teamRepository
  }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = await this.teamRepository.create(createTeamDto)

    return MongooseHelper.map<Team>(team)
  }

  getAll(championship: string): Promise<Team[]> {
    throw new Error('Method not implemented.')
  }

  update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<Team> {
    throw new Error('Method not implemented.')
  }
}
