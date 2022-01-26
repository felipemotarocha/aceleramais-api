import {
  CreateDriverStandingsDto,
  UpdateDriverStandingsDto
} from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings'
import MongooseHelper from '../../helpers/mongoose.helpers'
import DriverStandingsModel from '../../models/driver-standings.model'

export interface DriverStandingsRepositoryAbstract {
  create(
    createDriverStandingsDto: CreateDriverStandingsDto
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
    createDriverStandingsDto: CreateDriverStandingsDto
  ): Promise<DriverStandings> {
    const driverStandings = await this.driverStandingsModel.create(
      createDriverStandingsDto
    )

    return MongooseHelper.map<DriverStandings>(driverStandings.toJSON())
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
