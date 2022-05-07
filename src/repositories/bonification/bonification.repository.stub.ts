import { Types } from 'mongoose'
import Bonification from '../../entities/bonification.entity'
import { BonificationRepositoryAbstract } from './bonification.repository'

export const validBonification = {
  id: new Types.ObjectId().toHexString(),
  championship: new Types.ObjectId().toHexString(),
  name: 'Volta mais rápida',
  points: 1
}

export class BonificationRepositoryStub
implements BonificationRepositoryAbstract {
  async create(): Promise<Bonification> {
    return validBonification
  }

  async bulkCreate(): Promise<Bonification[]> {
    return [validBonification]
  }

  async getAll(): Promise<Bonification[]> {
    return [validBonification]
  }

  async update(): Promise<Bonification> {
    return validBonification
  }

  async delete(): Promise<Bonification> {
    return validBonification
  }

  async bulkDelete(): Promise<number> {
    return 1
  }
}
