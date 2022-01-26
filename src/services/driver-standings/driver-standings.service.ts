import {
  CreateDriverStandingsDto,
  UpdateDriverStandingsDto
} from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings'
import MongooseHelper from '../../helpers/mongoose.helpers'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'

export interface DriverStandingsServiceAbstract {
  create(
    createDriverStandingsDto: CreateDriverStandingsDto
  ): Promise<DriverStandings>
  update(
    id: string,
    updateDriverStandingsDto: UpdateDriverStandingsDto
  ): Promise<DriverStandings>
  getOne({ championship }: { championship: string }): Promise<DriverStandings>
}

export class DriverStandingsService implements DriverStandingsServiceAbstract {
  private readonly driverStandingsRepository: DriverStandingsRepositoryAbstract

  constructor(driverStandingsRepository: DriverStandingsRepositoryAbstract) {
    this.driverStandingsRepository = driverStandingsRepository
  }

  async create(
    createDriverStandingsDto: CreateDriverStandingsDto
  ): Promise<DriverStandings> {
    const driverStandings = await this.driverStandingsRepository.create(
      createDriverStandingsDto
    )

    return MongooseHelper.map<DriverStandings>(driverStandings)
  }

  update(
    id: string,
    updateDriverStandingsDto: UpdateDriverStandingsDto
  ): Promise<DriverStandings> {
    throw new Error('Method not implemented.')
  }

  getOne({ championship }: { championship: string }): Promise<DriverStandings> {
    throw new Error('Method not implemented.')
  }
}
