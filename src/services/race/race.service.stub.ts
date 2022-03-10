import Race from '../../entities/race.entity'
import { RaceServiceAbstract } from './race.service'

export const validRace: Race = {
  id: 'valid_id',
  track: 'valid_track_id',
  championship: 'valid_championship_id',
  startDate: 'valid_start_date',
  isCompleted: true,
  classification: 'valid_classification_id'
}

export default class RaceServiceStub implements RaceServiceAbstract {
  async create(): Promise<Race> {
    return validRace
  }

  async getOne(): Promise<Race> {
    return validRace
  }

  async getAll(): Promise<Race[]> {
    return [validRace]
  }

  async update(): Promise<Race> {
    return validRace
  }
}
