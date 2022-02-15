import RaceClassification from '../../entities/race-classification.entity'
import { RaceClassificationRepositoryAbstract } from './race-classification.repository'

export const validRaceClassification = {
  id: 'valid_id',
  race: 'valid_id',
  classification: [
    {
      position: 1,
      user: 'valid_id',
      team: 'valid_id',
      isRegistered: true,
      hasFastestLap: true,
      hasPolePosition: true
    }
  ]
}

export class RaceClassificationRepositoryStub
implements RaceClassificationRepositoryAbstract {
  async create(): Promise<RaceClassification> {
    return validRaceClassification
  }

  async getOne(): Promise<RaceClassification> {
    return validRaceClassification
  }

  async update(): Promise<RaceClassification> {
    return validRaceClassification
  }
}
