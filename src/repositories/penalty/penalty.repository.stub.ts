import { Types } from 'mongoose'
import Penalty from '../../entities/penalty.entity'
import { PenaltyRepositoryAbstract } from './penalty.repository'

export const validPenalty = {
  id: new Types.ObjectId().toHexString(),
  championship: new Types.ObjectId().toHexString(),
  name: 'Volta mais rápida',
  points: 1
}

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
