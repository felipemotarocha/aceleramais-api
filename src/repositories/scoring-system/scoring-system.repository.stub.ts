import ScoringSystem from '../../entities/scoring-system.entity'
import { ScoringSystemRepositoryAbstract } from './scoring-system.repository'

export const validScoringSystem = {
  id: 'valid_id',
  championship: 'valid_championship',
  scoringSystem: { 1: 25, 2: 20 }
}

export class ScoringSystemRepositoryStub
implements ScoringSystemRepositoryAbstract {
  async create(): Promise<ScoringSystem> {
    return validScoringSystem
  }

  async getOne(): Promise<ScoringSystem> {
    return validScoringSystem
  }

  async update(): Promise<ScoringSystem> {
    return validScoringSystem
  }

  async delete(): Promise<ScoringSystem> {
    return validScoringSystem
  }
}
