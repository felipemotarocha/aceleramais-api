import { CreateTeamDto, UpdateTeamDto } from '../../dtos/team.dtos'
import Team from '../../entities/team.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _TeamModel from '../../models/team.model'

export interface TeamRepositoryAbstract {
  create(createTeamDto: CreateTeamDto): Promise<Team>
  getAll(championship: string): Promise<Team[]>
  update(updateTeamDto: UpdateTeamDto): Promise<Team>
  delete(id: string): Promise<Team>
}

export class MongoTeamRepository implements TeamRepositoryAbstract {
  private readonly TeamModel: typeof _TeamModel

  constructor(TeamModel: typeof _TeamModel) {
    this.TeamModel = TeamModel
  }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = await this.TeamModel.create(createTeamDto)

    return MongooseHelper.map<Team>(team.toJSON())
  }

  async getAll(championship: string): Promise<Team[]> {
    const teams = await this.TeamModel.find({ championship })

    return teams.map((team) => MongooseHelper.map<Team>(team.toJSON()))
  }

  update(updateTeamDto: UpdateTeamDto): Promise<Team> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<Team> {
    throw new Error('Method not implemented.')
  }
}
