import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassfication from '../../entities/race-classification.entity'

export interface RaceClassificationRepositoryAbstract {
  create(
    createRaceClassificationDto: CreateRaceClassificationDto
  ): Promise<RaceClassfication>
  getOne(race: string): Promise<RaceClassfication>
  update(
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassfication>
}
