import Bonification from '../../entities/bonification.entity'
import { validBonification } from '../../services/bonification/bonification.service.spec'
import { BonificationRepositoryAbstract } from './bonification.repository'

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
