import { ClientSession } from 'mongoose'
import { CreateTeamDto, UpdateTeamDto } from '../../dtos/team.dtos'
import Team from '../../entities/team.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _TeamModel from '../../models/team.model'
import { BaseRepositoryParams } from '../base.repository'

export interface TeamRepositoryAbstract {
  create(createTeamDto: CreateTeamDto): Promise<Team>
  bulkCreate(
    params: BaseRepositoryParams & { dto: CreateTeamDto[] }
  ): Promise<Team[]>
  getAll({ championship }: { championship: string }): Promise<Team[]>
  update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>
  delete(id: string): Promise<Team>
  bulkDelete(params: {
    ids: string[]
    session?: ClientSession
  }): Promise<number>
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

  async bulkCreate(
    params: BaseRepositoryParams & { dto: CreateTeamDto[] }
  ): Promise<Team[]> {
    const teams = await this.TeamModel.create(params.dto, {
      session: params?.session
    })

    return teams.map((team) => MongooseHelper.map(team.toJSON()))
  }

  async getAll({ championship }: { championship: string }): Promise<Team[]> {
    const teams = await this.TeamModel.find({ championship })

    return teams.map((team) => MongooseHelper.map<Team>(team.toJSON()))
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.TeamModel.findByIdAndUpdate(id, updateTeamDto, {
      new: true
    })

    return MongooseHelper.map<Team>(team.toJSON())
  }

  async delete(id: string): Promise<Team> {
    const team = await this.TeamModel.findByIdAndDelete(id, { new: true })

    return MongooseHelper.map<Team>(team.toJSON())
  }

  async bulkDelete(params: {
    ids: string[]
    session?: ClientSession
  }): Promise<number> {
    const { deletedCount } = await this.TeamModel.deleteMany(
      { _id: params.ids },
      { new: true, session: params?.session }
    ).session(params.session!)

    return deletedCount
  }
}
