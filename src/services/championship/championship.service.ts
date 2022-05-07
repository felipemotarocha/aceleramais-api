/* eslint-disable no-useless-constructor */

import {
  Championship,
  ChampionshipRepositoryAbstract,
  ChampionshipServiceAbstract,
  ChampionshipServiceHelperAbstract,
  CreateParams,
  DriverStandingsRepositoryAbstract,
  GeneralHelpers,
  GetAllParams,
  GetOneParams,
  S3RepositoryAbstract,
  ScoringSystemRepositoryAbstract,
  startSession,
  TeamStandingsRepositoryAbstract,
  Types,
  UpdateParams
} from '.'

export class ChampionshipService implements ChampionshipServiceAbstract {
  constructor(
    private readonly championshipServiceHelper: ChampionshipServiceHelperAbstract,
    private readonly championshipRepository: ChampionshipRepositoryAbstract,
    private readonly driverStandingsRepository: DriverStandingsRepositoryAbstract,
    private readonly teamStandingsRepository: TeamStandingsRepositoryAbstract,
    private readonly scoringSystemRepository: ScoringSystemRepositoryAbstract,
    private readonly s3Repository: S3RepositoryAbstract
  ) {}

  async create({
    id = new Types.ObjectId() as any,
    dto
  }: CreateParams): Promise<Championship> {
    const session = await startSession()

    try {
      const championshipId = id
      const { name, description, platform, admins } = dto

      const code = GeneralHelpers.generateRandomNumberString(8)

      let codeIsAlreadyInUse = true

      while (codeIsAlreadyInUse) {
        const championshipWithTheCode =
          await this.championshipRepository.getOne({
            code
          })
        if (!championshipWithTheCode) {
          codeIsAlreadyInUse = false
        }
      }

      await session.startTransaction()

      const { drivers, teams } =
        await this.championshipServiceHelper.createDriversAndTeams({
          championship: id,
          drivers: dto.drivers,
          teams: dto.teams,
          session
        })

      const driverStandings = await this.driverStandingsRepository.create({
        dto: {
          championship: championshipId,
          standings: []
        },
        session
      })

      const teamStandings = await this.teamStandingsRepository.create({
        dto: {
          championship: championshipId,
          standings: []
        },
        session
      })

      const scoringSystem = await this.scoringSystemRepository.create({
        dto: {
          championship: championshipId,
          scoringSystem: dto.scoringSystem
        },
        session
      })

      const { bonifications, penalties } =
        await this.championshipServiceHelper.createPenaltiesAndBonifications({
          championship: id,
          bonifications: dto.bonifications,
          penalties: dto.penalties,
          session
        })

      const races = (
        await this.championshipServiceHelper.createRaces({
          championship: championshipId,
          races: dto.races,
          session
        })
      ).map((race) => race.id)

      // eslint-disable-next-line no-undef-init
      let avatarImageUrl: string | undefined = undefined

      if (dto.avatarImage) {
        avatarImageUrl = await this.s3Repository.uploadImage({
          folderName: 'championship-images',
          fileName: championshipId,
          file: dto.avatarImage
        })
      }

      const championship = await this.championshipRepository.create({
        dto: {
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
          pendentDrivers: dto.pendentDrivers || []
        },
        session
      })

      await session.commitTransaction()
      await session.endSession()

      return championship
    } catch (err) {
      await session.endSession()
      throw err
    }
  }

  async update({ id, dto }: UpdateParams): Promise<Championship> {
    const session = await startSession()
    try {
      const championship = await this.championshipRepository.getOne({
        id
      })

      await session.startTransaction()

      await this.championshipServiceHelper.prepareToUpdate({
        championship: championship!,
        session
      })

      const { drivers, teams } =
        await this.championshipServiceHelper.createDriversAndTeams({
          championship: id,
          drivers: dto.drivers,
          teams: dto.teams,
          session
        })
      const { penalties, bonifications } =
        await this.championshipServiceHelper.createPenaltiesAndBonifications({
          championship: id,
          bonifications: dto.bonifications,
          penalties: dto.penalties,
          session
        })

      const scoringSystem = await this.scoringSystemRepository.create({
        dto: {
          championship: id,
          scoringSystem: dto.scoringSystem
        },
        session
      })

      let races = championship!.races as string[]

      if (dto.races) {
        races = await (
          await this.championshipServiceHelper.updateRaces({
            championship: id,
            races: dto.races,
            session
          })
        ).map((race) => race.id!)
      }

      // eslint-disable-next-line no-undef-init
      let avatarImageUrl: string | undefined = championship?.avatarImageUrl

      if (dto.avatarImage) {
        avatarImageUrl = await this.s3Repository.uploadImage({
          folderName: 'championship-images',
          fileName: id,
          file: dto.avatarImage!
        })
      }

      const createdChampionship = await this.championshipRepository.update({
        id: id,
        dto: {
          description: dto?.description,
          name: dto?.name,
          platform: dto?.platform,
          drivers: drivers as any,
          pendentDrivers: dto.pendentDrivers,
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
  }: GetOneParams): Promise<Championship | null> {
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
  }: GetAllParams): Promise<Championship[]> {
    const championships = await this.championshipRepository.getAll({
      driver,
      admin,
      nameOrCode
    })

    return championships
  }
}
