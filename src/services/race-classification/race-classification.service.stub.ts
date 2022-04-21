import RaceClassification from '../../entities/race-classification.entity'
import { RaceClassificationServiceAbstract } from './race-classification.service'

export const validRaceClassification: RaceClassification = {
  id: 'valid_id',
  race: 'valid_id',
  classification: [
    {
      position: 1,
      user: 'valid_id',
      team: 'valid_id',
      isRegistered: true,
      isRemoved: false,
      hasFastestLap: true,
      hasPolePosition: true
    }
  ]
}

class RaceClassificationServiceStub
implements RaceClassificationServiceAbstract {
  async create(): Promise<RaceClassification> {
    return validRaceClassification
  }

  async getOne(): Promise<RaceClassification> {
    return validRaceClassification
  }

  async update(): Promise<RaceClassification> {
    return validRaceClassification
  }

  async refresh(championship: string): Promise<void> {}
}

export default RaceClassificationServiceStub
