/* eslint-disable no-useless-constructor */
import {
  ChampionshipServiceHelperAbstract,
  PrepareToUpdateParams,
  UpdateRacesParams,
  Race,
  CreatePenaltiesAndBonificationsParams,
  CreateDriversAndTeamsParams,
  Bonification,
  Penalty,
  Team,
  BonificationRepositoryAbstract,
  ChampionshipRepositoryAbstract,
  PenaltyRepositoryAbstract,
  ScoringSystemRepositoryAbstract,
  TeamRepositoryAbstract,
  CreateChampionshipDto,
  CreateTeamDto,
  isValidObjectId,
  Types,
  RaceClassificationRepositoryAbstract,
  CreateRacesParams,
  RaceRepositoryAbstract
} from '.'

class ChampionshipServiceHelper implements ChampionshipServiceHelperAbstract {
  constructor(
    private readonly championshipRepository: ChampionshipRepositoryAbstract,
    private readonly teamRepository: TeamRepositoryAbstract,
    private readonly scoringSystemRepository: ScoringSystemRepositoryAbstract,
    private readonly bonificationRepository: BonificationRepositoryAbstract,
    private readonly penaltyRepository: PenaltyRepositoryAbstract,
    private readonly raceRepository: RaceRepositoryAbstract,
    private readonly raceClassificationRepository: RaceClassificationRepositoryAbstract
  ) {}

  async createRaces(params: CreateRacesParams): Promise<Race[]> {
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

  async prepareToUpdate({
    championship,
    session
  }: PrepareToUpdateParams): Promise<void> {
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

  async updateRaces(params: UpdateRacesParams): Promise<Race[]> {
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

  async createPenaltiesAndBonifications(
    params: CreatePenaltiesAndBonificationsParams
  ): Promise<{ penalties: Penalty[]; bonifications: Bonification[] }> {
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

  async createDriversAndTeams(
    params: CreateDriversAndTeamsParams
  ): Promise<{ drivers: CreateChampionshipDto['drivers']; teams: Team[] }> {
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

    let _drivers: CreateChampionshipDto['drivers'] = []

    if (drivers) {
      _drivers = drivers.map((driver) =>
        driver.team ? { ...driver, team: driversPerTeam[driver.team] } : driver
      )
    }

    return { drivers: _drivers, teams: _teams }
  }
}

export default ChampionshipServiceHelper
