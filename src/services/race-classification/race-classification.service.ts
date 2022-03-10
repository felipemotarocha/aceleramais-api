/* eslint-disable no-useless-constructor */
import { isEmpty } from 'lodash'
import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import Race from '../../entities/race.entity'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import { RaceRepositoryAbstract } from '../../repositories/race/race.repository'

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
  constructor(
    private readonly raceClassificationRepository: RaceClassificationRepositoryAbstract,
    private readonly raceRepository: RaceRepositoryAbstract
  ) {}

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
    const sortedRaceClassification =
      updateRaceClassificationDto.classification.sort(
        (a, b) => a.position - b.position
      )

    const newRaceClassification =
      await this.raceClassificationRepository.update(id, {
        classification: sortedRaceClassification
      })

    if (isEmpty(newRaceClassification.classification)) {
      await this.raceRepository.update(
        (newRaceClassification.race as Race).id,
        {
          isCompleted: false
        }
      )
    } else {
      await this.raceRepository.update(
        (newRaceClassification.race as Race).id,
        {
          isCompleted: true
        }
      )
    }

    return newRaceClassification
  }
}

export default RaceClassificationService
