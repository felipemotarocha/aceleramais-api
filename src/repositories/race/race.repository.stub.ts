import Race from '../../entities/race.entity'
import { RaceRepositoryAbstract } from './race.repository'

export const validRace = {
  id: 'valid_id',
  track: 'valid_track_id',
  championship: 'valid_championship_id',
  startDate: 'valid_start_date',
  isCompleted: true,
  classification: 'valid_classification_id'
}

export class RaceRepositoryStub implements RaceRepositoryAbstract {
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

  async bulkDelete(): Promise<number> {
    return 1
  }
}
