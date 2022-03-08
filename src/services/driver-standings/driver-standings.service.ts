import {
  CreateDriverStandingsDto,
  UpdateDriverStandingsDto
} from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings.entity'
import RaceClassification from '../../entities/race-classification.entity'
import { BonificationRepositoryAbstract } from '../../repositories/bonification/bonification.repository'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { PenaltyRepositoryAbstract } from '../../repositories/penalty/penalty.repository'
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
    private bonificationRepository: BonificationRepositoryAbstract,
    private penaltyRepository: PenaltyRepositoryAbstract
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

  async refresh(championship: string): Promise<DriverStandings> {
    const races = await this.raceRepository.getAll({ championship })

    const _raceClassifications = await this.raceClassificationRepository.getAll(
      races.map((race) => race.classification)
    )

    const scoringSystem = await this.scoringSystemRepository.getOne({
      championship
    })

    // const _bonifications = await this.bonificationRepository.getAll({
    //   championship
    // })

    // const _penalties = await this.penaltyRepository.getAll({ championship })

    // Normalize data
    const raceClassifications: { [id: string]: RaceClassification } = {}

    for (const item of _raceClassifications) {
      raceClassifications[item.id] = item
    }

    // const bonifications: {[driver: string]: Bonification[]} = {}
    // const penalties: {[driver: string]: Penalty[]} = {}

    // for (const driver of championship) {

    // }

    // Calculate the standings
    const newDriverStandings: {
      [driver: string]: {
        firstName?: string
        lastName?: string
        isRegistered: boolean
        points: number
      }
    } = {}

    for (const race of races) {
      const raceClassification = raceClassifications[race.id]

      for (const classification of raceClassification.classification) {
        const points = scoringSystem.scoringSystem[classification.position]

        const driver = classification.isRegistered
          ? classification.user!
          : classification.id!

        newDriverStandings[driver] = {
          firstName: classification?.firstName,
          lastName: classification?.lastName,
          isRegistered: classification.isRegistered,
          points: (newDriverStandings[driver]?.points || 0) + points
        }
      }
    }

    console.log({ newDriverStandings })

    return await this.driverStandingsRepository.getOne({ championship })
  }
}
