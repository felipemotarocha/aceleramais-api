import {
  CreateScoringSystemDto,
  UpdateScoringSystemDto
} from '../../dtos/scoring-system.dtos'
import ScoringSystem from '../../entities/scoring-system.entity'
import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'

export interface ScoringSystemServiceAbstract {
  create(createScoringSystemDto: CreateScoringSystemDto): Promise<ScoringSystem>
  getOne({ championship }: { championship: string }): Promise<ScoringSystem>
  update(
    id: string,
    updateScoringSystemDto: UpdateScoringSystemDto
  ): Promise<ScoringSystem>
  delete(id: string): Promise<ScoringSystem>
}

export class ScoringSystemService implements ScoringSystemServiceAbstract {
  private readonly scoringSystemRepository: ScoringSystemRepositoryAbstract

  constructor(scoringSystemRepository: ScoringSystemRepositoryAbstract) {
    this.scoringSystemRepository = scoringSystemRepository
  }

  async create(
    createScoringSystemDto: CreateScoringSystemDto
  ): Promise<ScoringSystem> {
    return await this.scoringSystemRepository.create(createScoringSystemDto)
  }

  async getOne({
    championship
  }: {
    championship: string
  }): Promise<ScoringSystem> {
    return await this.scoringSystemRepository.getOne({ championship })
  }

  update(
    id: string,
    updateScoringSystemDto: UpdateScoringSystemDto
  ): Promise<ScoringSystem> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<ScoringSystem> {
    throw new Error('Method not implemented.')
  }
}
