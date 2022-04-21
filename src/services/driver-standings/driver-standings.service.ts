import {
  CreateDriverStandingsDto,
  UpdateDriverStandingsDto
} from '../../dtos/driver-standings.dto'
import Bonification from '../../entities/bonification.entity'
import DriverStandings from '../../entities/driver-standings.entity'
import Penalty from '../../entities/penalty.entity'
import RaceClassification from '../../entities/race-classification.entity'
import Race from '../../entities/race.entity'
import Team from '../../entities/team.entity'
import User from '../../entities/user.entity'

import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import { RaceRepositoryAbstract } from '../../repositories/race/race.repository'
import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'

export interface DriverStandingsServiceAbstract {
  create(
    createDriverStandingsDto: CreateDriverStandingsDto
  ): Promise<DriverStandings>
  update(
    id: string,
    updateDriverStandingsDto: UpdateDriverStandingsDto
  ): Promise<DriverStandings>
  getOne({ championship }: { championship: string }): Promise<DriverStandings>
  refresh(championship: string): Promise<DriverStandings>
}

export class DriverStandingsService implements DriverStandingsServiceAbstract {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private driverStandingsRepository: DriverStandingsRepositoryAbstract,
    private raceRepository: RaceRepositoryAbstract,
    private raceClassificationRepository: RaceClassificationRepositoryAbstract,
    private scoringSystemRepository: ScoringSystemRepositoryAbstract,
    private championshipRepository: ChampionshipRepositoryAbstract
  ) {}

  async create(
    createDriverStandingsDto: CreateDriverStandingsDto
  ): Promise<DriverStandings> {
    return await this.driverStandingsRepository.create(createDriverStandingsDto)
  }

  async update(
    id: string,
    updateDriverStandingsDto: UpdateDriverStandingsDto
  ): Promise<DriverStandings> {
    return await this.driverStandingsRepository.update(
      id,
      updateDriverStandingsDto
    )
  }

  async getOne({
    championship
  }: {
    championship: string
  }): Promise<DriverStandings> {
    return await this.driverStandingsRepository.getOne({ championship })
  }

  async refresh(_championship: string): Promise<DriverStandings> {
    const championship = await this.championshipRepository.getOne({
      id: _championship
    })

    const races = await this.raceRepository.getAll({
      championship: _championship
    })

    const _raceClassifications = await this.raceClassificationRepository.getAll(
      races.map((race) => race.id)
    )

    const scoringSystem = await this.scoringSystemRepository.getOne({
      championship: _championship
    })

    // Normalize data
    const raceClassifications: { [id: string]: RaceClassification } = {}

    for (const item of _raceClassifications) {
      raceClassifications[(item.race as Race).id] = item
    }

    // Calculate the standings
    const newDriverStandings: {
      [driver: string]: {
        firstName?: string
        lastName?: string
        isRegistered: boolean
        isRemoved: boolean
        points: number
        team?: string
      }
    } = {}

    for (const race of races) {
      const raceClassification = raceClassifications[race.id]

      for (const classification of raceClassification.classification) {
        if (!classification.scores) continue

        const points = scoringSystem.scoringSystem[classification.position]

        const driver = classification.isRegistered
          ? (classification.user as User).id!
          : classification.id!

        newDriverStandings[driver] = {
          firstName: classification?.firstName,
          lastName: classification?.lastName,
          isRegistered: classification.isRegistered,
          isRemoved: classification.isRemoved,
          team: (classification.team as Team)?.id,
          points: (newDriverStandings[driver]?.points || 0) + (points || 0)
        }
      }
    }

    for (const driver of championship.drivers) {
      if (driver.bonifications.length > 0) {
        const points = driver.bonifications.reduce((acc, currentValue) => {
          return acc + (currentValue.bonification as Bonification).points
        }, 0)

        const driverId = driver.isRegistered
          ? (driver.user as User).id
          : driver.id

        newDriverStandings[driverId!].points =
          newDriverStandings[driverId!].points + points
      }

      if (driver.penalties.length > 0) {
        const points = driver.penalties.reduce((acc, currentValue) => {
          return acc + (currentValue.penalty as Penalty).points
        }, 0)

        const driverId = driver.isRegistered
          ? (driver.user as User).id
          : driver.id

        newDriverStandings[driverId!].points =
          newDriverStandings[driverId!].points - points
      }
    }

    const updateDto = Object.keys(newDriverStandings)
      .sort(
        (a, b) => newDriverStandings[b].points - newDriverStandings[a].points
      )
      .map((key, index) => {
        if (newDriverStandings[key].isRegistered) {
          return { user: key, position: index + 1, ...newDriverStandings[key] }
        }

        return {
          id: key,
          position: index + 1,
          ...newDriverStandings[key]
        }
      })

    const driverStandings = await this.driverStandingsRepository.update(
      (championship.driverStandings as DriverStandings).id,
      {
        standings: updateDto
      }
    )

    return driverStandings
  }
}
