import DriverStandings from '../../entities/driver-standings.entity'
import { DriverStandingsServiceAbstract } from './driver-standings.service'

export const validDriverStandings = {
  id: 'valid_id',
  championship: 'valid_championship',
  standings: [
    {
      user: 'valid_user',
      isRegistered: true,
      position: 1,
      points: 10,
      isRemoved: false
    }
  ]
}

export default class DriverStandingsServiceStub
implements DriverStandingsServiceAbstract {
  async create(): Promise<DriverStandings> {
    return validDriverStandings
  }

  async getOne(): Promise<DriverStandings> {
    return validDriverStandings
  }

  async update(): Promise<DriverStandings> {
    return validDriverStandings
  }

  async delete(): Promise<DriverStandings> {
    return validDriverStandings
  }

  async refresh(): Promise<DriverStandings> {
    return validDriverStandings
  }
}
