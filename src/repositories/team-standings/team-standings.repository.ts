import {
  CreateTeamStandingsDto,
  UpdateTeamStandingsDto
} from '../../dtos/team-standings.dto'
import TeamStandings from '../../entities/team-standings.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TeamStandingsModel from '../../models/team-standings.model'
import { BaseRepositoryParams } from '../base.repository'

export interface TeamStandingsRepositoryAbstract {
  create(
    params: BaseRepositoryParams & {
      dto: CreateTeamStandingsDto
    }
  ): Promise<TeamStandings>
  update(
    id: string,
    updateTeamStandingsDto: UpdateTeamStandingsDto
  ): Promise<TeamStandings>
  getOne({ championship }: { championship: string }): Promise<TeamStandings>
}

export class MongoTeamStandingsRepository
implements TeamStandingsRepositoryAbstract {
  private readonly teamStandingsModel: typeof TeamStandingsModel

  constructor(teamStandingsModel: typeof TeamStandingsModel) {
    this.teamStandingsModel = teamStandingsModel
  }

  async create(
    params: BaseRepositoryParams & { dto: CreateTeamStandingsDto }
  ): Promise<TeamStandings> {
    const teamStandings = await this.teamStandingsModel.create([params.dto], {
      session: params?.session
    })

    return MongooseHelper.map<TeamStandings>(teamStandings[0].toJSON())
  }

  async update(
    id: string,
    updateTeamStandingsDto: UpdateTeamStandingsDto
  ): Promise<TeamStandings> {
    const teamStandings = await this.teamStandingsModel.findByIdAndUpdate(
      id,
      updateTeamStandingsDto,
      { new: true }
    )

    return MongooseHelper.map<TeamStandings>(teamStandings.toJSON())
  }

  async getOne({
    championship
  }: {
    championship: string
  }): Promise<TeamStandings> {
    const teamStandings = await this.teamStandingsModel.findOne({
      championship
    })

    return MongooseHelper.map<TeamStandings>(teamStandings.toJSON())
  }
}
