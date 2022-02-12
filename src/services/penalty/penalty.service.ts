import { CreatePenaltyDto, UpdatePenaltyDto } from '../../dtos/penalty.dtos'
import Penalty from '../../entities/penalty.entity'
import { PenaltyRepositoryAbstract } from '../../repositories/penalty/penalty.repository'

export interface PenaltyServiceAbstract {
  getAll({ championship }: { championship: string }): Promise<Penalty[]>
  create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty>
  update(id: string, updatePenaltyDto: UpdatePenaltyDto): Promise<Penalty>
  delete(id: string): Promise<Penalty>
}

export class PenaltyService implements PenaltyServiceAbstract {
  private readonly penaltyRepository: PenaltyRepositoryAbstract

  constructor(penaltyRepository: PenaltyRepositoryAbstract) {
    this.penaltyRepository = penaltyRepository
  }

  async getAll({ championship }: { championship: string }): Promise<Penalty[]> {
    return await this.penaltyRepository.getAll({ championship })
  }

  async create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty> {
    return await this.penaltyRepository.create(createPenaltyDto)
  }

  async update(
    id: string,
    updatePenaltyDto: UpdatePenaltyDto
  ): Promise<Penalty> {
    return await this.penaltyRepository.update(id, updatePenaltyDto)
  }

  async delete(id: string): Promise<Penalty> {
    return await this.penaltyRepository.delete(id)
  }
}
