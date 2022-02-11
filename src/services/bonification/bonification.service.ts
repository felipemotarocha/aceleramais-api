import {
  CreateBonificationDto,
  UpdateBonificationDto
} from '../../dtos/bonification.dtos'
import Bonification from '../../entities/bonification.entity'
import { BonificationRepositoryAbstract } from '../../repositories/bonification/bonification.repository'

export interface BonificationServiceAbstract {
  getAll({ championship }: { championship: string }): Promise<Bonification[]>
  create(createBonificationDto: CreateBonificationDto): Promise<Bonification>
  update(
    id: string,
    updateBonificationDto: UpdateBonificationDto
  ): Promise<Bonification>
  delete(id: string): Promise<Bonification>
}

export class BonificationService implements BonificationServiceAbstract {
  private readonly bonificationRepository: BonificationRepositoryAbstract

  constructor(bonificationRepository: BonificationRepositoryAbstract) {
    this.bonificationRepository = bonificationRepository
  }

  async getAll({
    championship
  }: {
    championship: string
  }): Promise<Bonification[]> {
    return await this.bonificationRepository.getAll({ championship })
  }

  async create(
    createBonificationDto: CreateBonificationDto
  ): Promise<Bonification> {
    return await this.bonificationRepository.create(createBonificationDto)
  }

  async update(
    id: string,
    updateBonificationDto: UpdateBonificationDto
  ): Promise<Bonification> {
    return await this.bonificationRepository.update(id, updateBonificationDto)
  }

  async delete(id: string): Promise<Bonification> {
    return await this.bonificationRepository.delete(id)
  }
}
