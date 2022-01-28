import { Types } from 'mongoose'
import { CreateChampionshipDto } from '../../dtos/championship.dtos'
import Championship from '../../entities/championship.entity'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import { RaceRepositoryAbstract } from '../../repositories/race/race.repository'
import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'
import { TeamStandingsRepositoryAbstract } from '../../repositories/team-standings/team-standings.repository'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'

export interface ChampionshipServiceAbstract {
  create(
    id: string,
    createChampionshipDto: CreateChampionshipDto
  ): Promise<Championship>
  getOne({ id }: { id: string }): Promise<Championship>
}

export class ChampionshipService implements ChampionshipServiceAbstract {
  private readonly championshipRepository: ChampionshipRepositoryAbstract
  private readonly teamRepository: TeamRepositoryAbstract
  private readonly driverStandingsRepository: DriverStandingsRepositoryAbstract
  private readonly teamStandingsRepository: TeamStandingsRepositoryAbstract
  private readonly scoringSystemRepository: ScoringSystemRepositoryAbstract
  private readonly raceRepository: RaceRepositoryAbstract
  private readonly raceClassificationRepository: RaceClassificationRepositoryAbstract

  constructor(
    championshipRepository: ChampionshipRepositoryAbstract,
    teamRepository: TeamRepositoryAbstract,
    driverStandingsRepository: DriverStandingsRepositoryAbstract,
    teamStandingsRepository: TeamStandingsRepositoryAbstract,
    scoringSystemRepository: ScoringSystemRepositoryAbstract,
    raceRepository: RaceRepositoryAbstract,
    raceClassificationRepository: RaceClassificationRepositoryAbstract
  ) {
    this.championshipRepository = championshipRepository
    this.teamRepository = teamRepository
    this.driverStandingsRepository = driverStandingsRepository
    this.teamStandingsRepository = teamStandingsRepository
    this.scoringSystemRepository = scoringSystemRepository
    this.raceRepository = raceRepository
    this.raceClassificationRepository = raceClassificationRepository
  }

  async create(
    id: string,
    createChampionshipDto: CreateChampionshipDto
  ): Promise<Championship> {
    const championshipId = id
    const { name, description, platform, avatarImageUrl } =
      createChampionshipDto

    let teamIds: string[] = []

    if (createChampionshipDto?.teams) {
      const teams = await this.teamRepository.bulkCreate(
        createChampionshipDto.teams.map((team) => ({
          ...team,
          championship: championshipId as any
        }))
      )

      teamIds = teams.map((team) => team.id)
    }

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

    const races: string[] = []

    for (const race of createChampionshipDto.races) {
      const raceId = new Types.ObjectId()

      const raceClassification = await this.raceClassificationRepository.create(
        { race: raceId as any, classification: [] }
      )
      const result = await this.raceRepository.create({
        _id: raceId as any,
        championship: championshipId,
        classification: raceClassification.id,
        startDate: race.startDate,
        track: race.track
      })

      races.push(result.id)
    }

    const championship = await this.championshipRepository.create({
      name,
      description,
      platform,
      avatarImageUrl,
      scoringSystem: scoringSystem.id,
      driverStandings: driverStandings.id,
      teamStandings: teamStandings.id,
      teams: teamIds,
      races
    })

    return championship
  }

  async getOne({ id }: { id: string }): Promise<Championship> {
    const championship = await this.championshipRepository.getOne({ id })

    return championship
  }
}
