import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'

export interface RaceClassificationServiceAbstract {
  create(
    createRaceClassificationDto: CreateRaceClassificationDto
  ): Promise<RaceClassification>
  getOne(race: string): Promise<RaceClassification>
  update(
    id: string,
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassification>
}

class RaceClassificationService implements RaceClassificationServiceAbstract {
  private readonly raceClassificationRepository: RaceClassificationRepositoryAbstract

  constructor(
    raceClassificationRepository: RaceClassificationRepositoryAbstract
  ) {
    this.raceClassificationRepository = raceClassificationRepository
  }

  async create(
    createRaceClassificationDto: CreateRaceClassificationDto
  ): Promise<RaceClassification> {
    return await this.raceClassificationRepository.create(
      createRaceClassificationDto
    )
  }

  async getOne(race: string): Promise<RaceClassification> {
    return await this.raceClassificationRepository.getOne(race)
  }

  async update(
    id: string,
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassification> {
    return await this.raceClassificationRepository.update(
      id,
      updateRaceClassificationDto
    )
  }
}

export default RaceClassificationService