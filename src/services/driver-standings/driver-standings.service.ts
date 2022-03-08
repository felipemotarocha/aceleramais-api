import {
  CreateDriverStandingsDto,
  UpdateDriverStandingsDto
} from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings.entity'
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

  refresh(championship: string): Promise<DriverStandings> {
    throw new Error('Method not implemented.')
  }
}
