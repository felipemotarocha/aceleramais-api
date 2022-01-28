import { CreateChampionshipDto } from '../../dtos/championship.dtos'
import Championship from '../../entities/championship.entity'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
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

  constructor(
    championshipRepository: ChampionshipRepositoryAbstract,
    teamRepository: TeamRepositoryAbstract
  ) {
    this.championshipRepository = championshipRepository
    this.teamRepository = teamRepository
  }

  async create(
    id: string,
    createChampionshipDto: CreateChampionshipDto
  ): Promise<Championship> {
    const championshipId = id

    let teamIds: string[] = []

    if (createChampionshipDto?.teams) {
      const teams = await this.teamRepository.bulkCreate(
        createChampionshipDto.teams.map((team) => ({
          ...team,
          championship: championshipId as any
        }))
      )

      // eslint-disable-next-line no-unused-vars
      teamIds = teams.map((team) => team.id)
    }

    return {
      id: 'valid_id',
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: ['valid_race'],
      teams: ['valid_team'],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: 'valid_scoring_system',
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }
  }

  getOne({ id }: { id: string }): Promise<Championship> {
    throw new Error('Method not implemented.')
  }
}
