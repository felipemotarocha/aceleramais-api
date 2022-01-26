import { CreateTeamDto, UpdateTeamDto } from '../../dtos/team.dtos'
import Team from '../../entities/team.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'

export interface TeamServiceAbstract {
  create(createTeamDto: CreateTeamDto): Promise<Team>
  getAll({ championship }: { championship: string }): Promise<Team[]>
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

  async getAll({ championship }: { championship: string }): Promise<Team[]> {
    const teams = await this.teamRepository.getAll({ championship })

    return teams.map((team) => MongooseHelper.map<Team>(team))
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamRepository.update(id, updateTeamDto)

    return MongooseHelper.map<Team>(team)
  }

  delete(id: string): Promise<Team> {
    throw new Error('Method not implemented.')
  }
}
