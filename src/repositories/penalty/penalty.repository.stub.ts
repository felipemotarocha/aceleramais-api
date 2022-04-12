import Penalty from '../../entities/penalty.entity'
import { validPenalty } from '../../services/penalty/penalty.service.spec'
import { PenaltyRepositoryAbstract } from './penalty.repository'

export class PenaltyRepositoryStub implements PenaltyRepositoryAbstract {
  async create(): Promise<Penalty> {
    return validPenalty
  }

  async bulkCreate(): Promise<Penalty[]> {
    return [validPenalty]
  }

  async getAll(): Promise<Penalty[]> {
    return [validPenalty]
  }

  async update(): Promise<Penalty> {
    return validPenalty
  }

  async delete(): Promise<Penalty> {
    return validPenalty
  }

  async bulkDelete(): Promise<number> {
    return 1
  }
}
