/* eslint-disable no-useless-constructor */
import { Types } from 'mongoose'
import {
  CreateChampionshipDto,
  UpdateChampionshipDto
} from '../../dtos/championship.dtos'
import { CreateTeamDto } from '../../dtos/team.dtos'
import Bonification from '../../entities/bonification.entity'
import Championship from '../../entities/championship.entity'
import Penalty from '../../entities/penalty.entity'
import Race from '../../entities/race.entity'
import Team from '../../entities/team.entity'
import { BonificationRepositoryAbstract } from '../../repositories/bonification/bonification.repository'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { PenaltyRepositoryAbstract } from '../../repositories/penalty/penalty.repository'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import { RaceRepositoryAbstract } from '../../repositories/race/race.repository'
import { S3RepositoryAbstract } from '../../repositories/s3/s3.repository'
import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'
import { TeamStandingsRepositoryAbstract } from '../../repositories/team-standings/team-standings.repository'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'

export interface ChampionshipServiceAbstract {
  create({
    id,
    createChampionshipDto
  }: {
    id?: string
    createChampionshipDto: CreateChampionshipDto
  }): Promise<Championship>
  getOne({
    id,
    fullPopulate
  }: {
    id: string
    fullPopulate?: boolean
  }): Promise<Championship>
  getAll({
    driver,
    admin
  }: {
    driver?: string
    admin?: string
  }): Promise<Championship[]>
  update(
    id: string,
    updateChampionshipDto: UpdateChampionshipDto
  ): Promise<Championship>
  prepareToUpdate(championship: Championship): Promise<void>
  updateRaces(
    championship: string,
    races: UpdateChampionshipDto['races']
  ): Promise<Race[]>
}

export class ChampionshipService implements ChampionshipServiceAbstract {
  constructor(
    private readonly championshipRepository: ChampionshipRepositoryAbstract,
    private readonly teamRepository: TeamRepositoryAbstract,
    private readonly driverStandingsRepository: DriverStandingsRepositoryAbstract,
    private readonly teamStandingsRepository: TeamStandingsRepositoryAbstract,
    private readonly scoringSystemRepository: ScoringSystemRepositoryAbstract,
    private readonly raceRepository: RaceRepositoryAbstract,
    private readonly raceClassificationRepository: RaceClassificationRepositoryAbstract,
    private readonly bonificationRepository: BonificationRepositoryAbstract,
    private readonly penaltyRepository: PenaltyRepositoryAbstract,
    private readonly s3Repository: S3RepositoryAbstract
  ) {}

  async createDriversAndTeams({
    championship,
    drivers,
    teams
  }: {
    championship: string
    drivers: CreateChampionshipDto['drivers']
    teams: CreateChampionshipDto['teams']
  }) {
    let _teams: Team[] = []

    const driversPerTeam = {}

    if (drivers) {
      for (const driver of drivers) {
        if (!driver?.team) continue

        driversPerTeam[driver.team] = true
      }
    }

    if (teams) {
      const bulkCreatePayload: CreateTeamDto[] = []

      for (const team of teams) {
        const id = new Types.ObjectId()

        if (driversPerTeam[team.id]) {
          driversPerTeam[team.id] = id
        }

        bulkCreatePayload.push({
          _id: id as any,
          name: team.name,
          color: team.color,
          championship
        } as any)
      }

      _teams = await this.teamRepository.bulkCreate(bulkCreatePayload)
    }

    let _drivers: {
      user?: string
      id?: string
      firstName?: string
      lastName?: string
      team?: string
      isRegistered: boolean
    }[] = []

    if (drivers) {
      _drivers = drivers.map((driver) =>
        driver.team ? { ...driver, team: driversPerTeam[driver.team] } : driver
      )
    }

    return { drivers: _drivers, teams: _teams }
  }

  async createPenaltiesAndBonifications({
    championship,
    penalties,
    bonifications
  }: {
    championship: string
    penalties: CreateChampionshipDto['penalties']
    bonifications: CreateChampionshipDto['bonifications']
  }) {
    let _bonifications: Bonification[] = []
    let _penalties: Penalty[] = []

    if (bonifications) {
      _bonifications = await this.bonificationRepository.bulkCreate(
        bonifications.map((item) => ({
          ...item,
          championship: championship
        }))
      )
    }

    if (penalties) {
      _penalties = await this.penaltyRepository.bulkCreate(
        penalties.map((item) => ({
          ...item,
          championship: championship
        }))
      )
    }

    return { penalties: _penalties, bonifications: _bonifications }
  }

  async createRaces(
    championship: string,
    races: CreateChampionshipDto['races']
  ): Promise<Race[]> {
    const _races: Race[] = []

    for (const race of races) {
      const raceId = new Types.ObjectId()

      const raceClassification = await this.raceClassificationRepository.create(
        { race: raceId as any, classification: [] }
      )
      const result = await this.raceRepository.create({
        _id: raceId as any,
        championship,
        classification: raceClassification.id,
        startDate: race.startDate,
        track: race.track
      })

      _races.push(result)
    }

    return _races
  }

  async create({
    id = new Types.ObjectId() as any,
    createChampionshipDto
  }: {
    id?: string
    createChampionshipDto: CreateChampionshipDto
  }): Promise<Championship> {
    const championshipId = id
    const { name, description, platform, admins } = createChampionshipDto

    const { drivers, teams } = await this.createDriversAndTeams({
      championship: id,
      drivers: createChampionshipDto.drivers,
      teams: createChampionshipDto.teams
    })

    const driverStandings = await this.driverStandingsRepository.create({
      championship: championshipId,
      standings: []
    })

    const teamStandings = await this.teamStandingsRepository.create({
      championship: championshipId,
      standings: []
    })

    const scoringSystem = await this.scoringSystemRepository.create({
      championship: championshipId,
      scoringSystem: createChampionshipDto.scoringSystem
    })

    const { bonifications, penalties } =
      await this.createPenaltiesAndBonifications({
        championship: id,
        bonifications: createChampionshipDto.bonifications,
        penalties: createChampionshipDto.penalties
      })

    const races = (
      await this.createRaces(championshipId, createChampionshipDto.races)
    ).map((race) => race.id)

    // eslint-disable-next-line no-undef-init
    let avatarImageUrl: string | undefined = undefined

    if (createChampionshipDto.avatarImage) {
      avatarImageUrl = await this.s3Repository.uploadImage({
        folderName: 'championship-images',
        fileName: championshipId,
        file: createChampionshipDto.avatarImage
      })
    }

    const championship = await this.championshipRepository.create({
      _id: championshipId,
      name,
      description,
      platform,
      admins,
      avatarImageUrl,
      scoringSystem: scoringSystem.id,
      driverStandings: driverStandings.id,
      teamStandings: teamStandings.id,
      teams: teams.map((item) => item.id),
      bonifications: bonifications.map((item) => item.id),
      penalties: penalties.map((item) => item.id),
      races,
      drivers
    })

    return championship
  }

  async prepareToUpdate(championship: Championship) {
    const { teams, bonifications, penalties, scoringSystem } = championship

    await this.teamRepository.bulkDelete(teams as string[])
    await this.bonificationRepository.bulkDelete(bonifications as string[])
    await this.penaltyRepository.bulkDelete(penalties as string[])
    await this.scoringSystemRepository.delete(scoringSystem as string)

    await this.championshipRepository.update(championship.id, {
      drivers: [],
      bonifications: [],
      penalties: [],
      teams: [],
      scoringSystem: scoringSystem as string
    })
  }

  async updateRaces(
    championship: string,
    races: UpdateChampionshipDto['races']
  ) {
    const existingRaces = races!.filter((race) => race.id)
    const newRaces = races!.filter((race) => !race?.id)

    const championshipRaces = await this.raceRepository.getAll({ championship })

    const racesToDelete = championshipRaces.filter((race) =>
      existingRaces.every((_race) => _race.id !== race.id)
    )

    await this.raceRepository.bulkDelete(racesToDelete.map((race) => race.id))
    await this.raceClassificationRepository.bulkDelete(
      racesToDelete.map((race) => race.classification)
    )

    const createdRaces = await this.createRaces(
      championship,
      newRaces as CreateChampionshipDto['races']
    )

    return [...createdRaces, ...existingRaces] as Race[]
  }

  async update(
    id: string,
    updateChampionshipDto: UpdateChampionshipDto
  ): Promise<Championship> {
    const championship = await this.championshipRepository.getOne({ id })

    await this.prepareToUpdate(championship)

    const { drivers, teams } = await this.createDriversAndTeams({
      championship: id,
      drivers: updateChampionshipDto.drivers,
      teams: updateChampionshipDto.teams
    })
    const { penalties, bonifications } =
      await this.createPenaltiesAndBonifications({
        championship: id,
        bonifications: updateChampionshipDto.bonifications,
        penalties: updateChampionshipDto.penalties
      })

    const scoringSystem = await this.scoringSystemRepository.create({
      championship: id,
      scoringSystem: updateChampionshipDto.scoringSystem
    })

    let races = championship.races as string[]

    if (updateChampionshipDto.races) {
      races = await (
        await this.updateRaces(id, updateChampionshipDto.races)
      ).map((race) => race.id!)
    }

    // eslint-disable-next-line no-undef-init
    let avatarImageUrl: string | undefined = championship?.avatarImageUrl

    if (updateChampionshipDto.avatarImage) {
      avatarImageUrl = await this.s3Repository.uploadImage({
        folderName: 'championship-images',
        fileName: id,
        file: updateChampionshipDto.avatarImage!
      })
    }

    return await this.championshipRepository.update(id, {
      ...updateChampionshipDto,
      drivers,
      scoringSystem: scoringSystem.id,
      teams: teams.map((item) => item.id),
      bonifications: bonifications.map((item) => item.id),
      penalties: penalties.map((item) => item.id),
      races,
      avatarImageUrl
    })
  }

  async getOne({
    id,
    fullPopulate
  }: {
    id: string
    fullPopulate?: boolean
  }): Promise<Championship> {
    const championship = await this.championshipRepository.getOne({
      id,
      fullPopulate
    })

    return championship
  }

  async getAll({
    driver,
    admin
  }: {
    driver?: string | undefined
    admin?: string | undefined
  }): Promise<Championship[]> {
    const championships = await this.championshipRepository.getAll({
      driver,
      admin
    })

    return championships
  }
}
