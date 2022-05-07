/* eslint-disable no-useless-constructor */
import { ClientSession, isValidObjectId, startSession, Types } from 'mongoose'
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
import GeneralHelpers from '../../helpers/general.helpers'
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
  }): Promise<Championship | null>
  getAll({
    driver,
    admin,
    nameOrCode
  }: {
    driver?: string
    admin?: string
    nameOrCode?: string
  }): Promise<Championship[]>
  update(
    id: string,
    updateChampionshipDto: UpdateChampionshipDto
  ): Promise<Championship>
  prepareToUpdate(
    championship: Championship,
    session?: ClientSession
  ): Promise<void>
  updateRaces(params: {
    championship: string
    races: UpdateChampionshipDto['races']
    session?: ClientSession
  }): Promise<Race[]>
  createPenaltiesAndBonifications({
    championship,
    penalties,
    bonifications
  }: {
    championship: string
    penalties: CreateChampionshipDto['penalties']
    bonifications: CreateChampionshipDto['bonifications']
  }): Promise<{
    penalties: Penalty[]
    bonifications: Bonification[]
  }>
  createDriversAndTeams({
    championship,
    drivers,
    teams
  }: {
    championship: string
    drivers: CreateChampionshipDto['drivers']
    teams: CreateChampionshipDto['teams']
  }): Promise<{
    drivers: {
      user?: string | undefined
      id?: string | undefined
      firstName?: string | undefined
      lastName?: string | undefined
      team?: string | undefined
      isRegistered: boolean
    }[]
    teams: Team[]
  }>
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

  async createDriversAndTeams(params: {
    championship: string
    drivers: CreateChampionshipDto['drivers']
    teams: CreateChampionshipDto['teams']
    session?: ClientSession
  }) {
    const { championship, drivers, teams, session } = params

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
        const isBeingUpdated = isValidObjectId(team.id)

        const id = isBeingUpdated ? team.id : new Types.ObjectId()

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

      _teams = await this.teamRepository.bulkCreate({
        dto: bulkCreatePayload,
        session
      })
    }

    let _drivers: {
      user?: string
      id?: string
      firstName?: string
      lastName?: string
      team?: string
      isRegistered: boolean
      isRemoved: boolean
    }[] = []

    if (drivers) {
      _drivers = drivers.map((driver) =>
        driver.team ? { ...driver, team: driversPerTeam[driver.team] } : driver
      )
    }

    return { drivers: _drivers, teams: _teams }
  }

  async createPenaltiesAndBonifications(params: {
    championship: string
    penalties: CreateChampionshipDto['penalties']
    bonifications: CreateChampionshipDto['bonifications']
    session?: ClientSession
  }) {
    const { penalties, bonifications, championship, session } = params

    let _bonifications: Bonification[] = []
    let _penalties: Penalty[] = []

    if (bonifications) {
      _bonifications = await this.bonificationRepository.bulkCreate({
        dto: bonifications.map((item) => {
          const isBeingUpdated = isValidObjectId((item as any)?.id)

          if (isBeingUpdated) {
            return {
              ...item,
              _id: (item as any).id,
              championship: championship
            }
          }

          return {
            ...item,
            championship: championship
          }
        }),
        session
      })
    }

    if (penalties) {
      _penalties = await this.penaltyRepository.bulkCreate({
        dto: penalties.map((item) => {
          const isBeingUpdated = isValidObjectId((item as any)?.id)

          if (isBeingUpdated) {
            return {
              ...item,
              _id: (item as any).id,
              championship: championship
            }
          }

          return {
            ...item,
            championship: championship
          }
        }),
        session
      })
    }

    return { penalties: _penalties, bonifications: _bonifications }
  }

  async createRaces(params: {
    championship: string
    races: CreateChampionshipDto['races']
    session?: ClientSession
  }): Promise<Race[]> {
    const { races, session, championship } = params

    const _races: Race[] = []

    for (const race of races) {
      const raceId = new Types.ObjectId()

      const raceClassification = await this.raceClassificationRepository.create(
        { dto: { race: raceId as any, classification: [] }, session }
      )
      const result = await this.raceRepository.create({
        dto: {
          _id: raceId as any,
          championship,
          classification: raceClassification.id,
          startDate: race.startDate,
          track: race.track
        },
        session
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

    const code = GeneralHelpers.generateRandomNumberString(8)

    let codeIsAlreadyInUse = true

    while (codeIsAlreadyInUse) {
      const championshipWithTheCode = await this.championshipRepository.getOne({
        code
      })
      if (!championshipWithTheCode) {
        codeIsAlreadyInUse = false
      }
    }

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
      dto: {
        championship: championshipId,
        scoringSystem: createChampionshipDto.scoringSystem
      }
    })

    const { bonifications, penalties } =
      await this.createPenaltiesAndBonifications({
        championship: id,
        bonifications: createChampionshipDto.bonifications,
        penalties: createChampionshipDto.penalties
      })

    const races = (
      await this.createRaces({
        championship: championshipId,
        races: createChampionshipDto.races
      })
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
      code,
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
      drivers,
      pendentDrivers: createChampionshipDto.pendentDrivers || []
    })

    return championship
  }

  async prepareToUpdate(championship: Championship, session: ClientSession) {
    const { teams, bonifications, penalties, scoringSystem } = championship

    await this.teamRepository.bulkDelete({ ids: teams as string[], session })
    await this.bonificationRepository.bulkDelete({
      ids: bonifications as string[],
      session
    })
    await this.penaltyRepository.bulkDelete({
      ids: penalties as string[],
      session
    })
    await this.scoringSystemRepository.delete({
      id: scoringSystem as string,
      session
    })

    await this.championshipRepository.update({
      id: championship.id,
      dto: {
        drivers: [],
        pendentDrivers: [],
        bonifications: [],
        penalties: [],
        teams: [],
        scoringSystem: scoringSystem as string
      },
      session
    })
  }

  async updateRaces(params: {
    championship: string
    races: UpdateChampionshipDto['races']
    session?: ClientSession
  }) {
    const { races, championship, session } = params

    const existingRaces = races!.filter((race) => isValidObjectId(race.id))
    const newRaces = races!.filter((race) => !isValidObjectId(race.id))

    const championshipRaces = await this.raceRepository.getAll({
      dto: { championship },
      session
    })

    const racesToDelete = championshipRaces.filter((race) =>
      existingRaces.every((_race) => _race.id !== race.id)
    )

    await this.raceRepository.bulkDelete({
      ids: racesToDelete.map((race) => race.id),
      session
    })
    await this.raceClassificationRepository.bulkDelete({
      ids: racesToDelete.map((race) => race.classification),
      session
    })

    const createdRaces = await this.createRaces({
      championship,
      races: newRaces as CreateChampionshipDto['races'],
      session
    })

    return [...createdRaces, ...existingRaces] as Race[]
  }

  async update(
    id: string,
    updateChampionshipDto: UpdateChampionshipDto
  ): Promise<Championship> {
    const session = await startSession()
    try {
      const championship = await this.championshipRepository.getOne({
        id
      })

      await session.startTransaction()

      await this.prepareToUpdate(championship!, session)

      const { drivers, teams } = await this.createDriversAndTeams({
        championship: id,
        drivers: updateChampionshipDto.drivers,
        teams: updateChampionshipDto.teams,
        session
      })
      const { penalties, bonifications } =
        await this.createPenaltiesAndBonifications({
          championship: id,
          bonifications: updateChampionshipDto.bonifications,
          penalties: updateChampionshipDto.penalties,
          session
        })

      const scoringSystem = await this.scoringSystemRepository.create({
        dto: {
          championship: id,
          scoringSystem: updateChampionshipDto.scoringSystem
        },
        session
      })

      let races = championship!.races as string[]

      if (updateChampionshipDto.races) {
        races = await (
          await this.updateRaces({
            championship: id,
            races: updateChampionshipDto.races,
            session
          })
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

      const createdChampionship = await this.championshipRepository.update({
        id: id,
        dto: {
          description: updateChampionshipDto?.description,
          name: updateChampionshipDto?.name,
          platform: updateChampionshipDto?.platform,
          drivers,
          pendentDrivers: updateChampionshipDto.pendentDrivers,
          scoringSystem: scoringSystem.id,
          teams: teams.map((item) => item.id),
          bonifications: bonifications.map((item) => item.id),
          penalties: penalties.map((item) => item.id),
          races,
          avatarImageUrl
        },
        session
      })

      await session.commitTransaction()
      await session.endSession()

      return createdChampionship
    } catch (error) {
      await session.endSession()
      throw error
    }
  }

  async getOne({
    id,
    fullPopulate
  }: {
    id: string
    fullPopulate?: boolean
  }): Promise<Championship | null> {
    const championship = await this.championshipRepository.getOne({
      id,
      fullPopulate
    })

    return championship
  }

  async getAll({
    driver,
    admin,
    nameOrCode
  }: {
    driver?: string | undefined
    admin?: string | undefined
    nameOrCode?: string
  }): Promise<Championship[]> {
    const championships = await this.championshipRepository.getAll({
      driver,
      admin,
      nameOrCode
    })

    return championships
  }
}
