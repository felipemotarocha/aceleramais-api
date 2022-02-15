import DriverStandings from '../../entities/driver-standings.entity'
import { DriverStandingsRepositoryAbstract } from './driver-standings.repository'

export const validDriverStandings = {
  id: 'valid_id',
  championship: 'valid_championship',
  standings: [
    {
      user: 'valid_user',
      isRegistered: true,
      position: 1,
      points: 25
    }
  ]
}

export class DriverStandingsRepositoryStub
implements DriverStandingsRepositoryAbstract {
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
}
