/* eslint-disable no-useless-constructor */
import { isEmpty } from 'lodash'
import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import Race from '../../entities/race.entity'
import Team from '../../entities/team.entity'
import User from '../../entities/user.entity'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
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
  refresh(championship: string): Promise<void>
}

class RaceClassificationService implements RaceClassificationServiceAbstract {
  constructor(
    private readonly raceClassificationRepository: RaceClassificationRepositoryAbstract,
    private readonly raceRepository: RaceRepositoryAbstract,
    private readonly championshipRepository: ChampionshipRepositoryAbstract
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

  async refresh(championship: string): Promise<void> {
    const _championship = await this.championshipRepository.getOne({
      id: championship
    })

    const raceClassifications = await this.raceClassificationRepository.getAll(
      _championship.races as string[]
    )

    // Normalize championship drivers
    let driverTeams: {
      [driver: string]: { team: string; isRemoved: boolean }
    } = {}

    for (const driver of _championship.drivers) {
      driverTeams = {
        ...driverTeams,
        [driver?.id || (driver?.user as any)?.id]: {
          team: (driver?.team as Team)?.id,
          isRemoved: driver.isRemoved
        }
      }
    }

    for (const raceClassification of raceClassifications) {
      // Update the teams and isRemoved
      const newClassification = raceClassification.classification.map(
        (item) => ({
          ...item,
          user: (item?.user as User)?.id,
          team: driverTeams[item?.id || (item?.user as User)?.id]?.team,
          isRemoved: driverTeams[item?.id || (item?.user as User)?.id].isRemoved
        })
      )

      await this.update(raceClassification.id, {
        classification: newClassification
      })
    }
  }
}

export default RaceClassificationService
