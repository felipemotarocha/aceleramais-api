import {
  CreateDriverStandingsDto,
  UpdateDriverStandingsDto
} from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import DriverStandingsModel from '../../models/driver-standings.model'
import { BaseRepositoryParams } from '../base.repository'

export interface DriverStandingsRepositoryAbstract {
  create(
    params: BaseRepositoryParams & {
      dto: CreateDriverStandingsDto
    }
  ): Promise<DriverStandings>
  update(
    id: string,
    updateDriverStandingsDto: UpdateDriverStandingsDto
  ): Promise<DriverStandings>
  getOne({ championship }: { championship: string }): Promise<DriverStandings>
}

export class MongoDriverStandingsRepository
implements DriverStandingsRepositoryAbstract {
  private readonly driverStandingsModel: typeof DriverStandingsModel

  constructor(driverStandingsModel: typeof DriverStandingsModel) {
    this.driverStandingsModel = driverStandingsModel
  }

  async create(
    params: BaseRepositoryParams & { dto: CreateDriverStandingsDto }
  ): Promise<DriverStandings> {
    const driverStandings = await this.driverStandingsModel.create(
      [params.dto],
      { session: params?.session }
    )

    return MongooseHelper.map<DriverStandings>(driverStandings[0].toJSON())
  }

  async update(
    id: string,
    updateDriverStandingsDto: UpdateDriverStandingsDto
  ): Promise<DriverStandings> {
    const driverStandings = await this.driverStandingsModel.findByIdAndUpdate(
      id,
      updateDriverStandingsDto,
      { new: true }
    )

    return MongooseHelper.map<DriverStandings>(driverStandings.toJSON())
  }

  async getOne({
    championship
  }: {
    championship: string
  }): Promise<DriverStandings> {
    const driverStandings = await this.driverStandingsModel.findOne({
      championship
    })

    return MongooseHelper.map<DriverStandings>(driverStandings.toJSON())
  }
}
