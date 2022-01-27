import TeamStandings from '../../entities/team-standings.entity'
import { TeamStandingsRepositoryAbstract } from '../../repositories/team-standings/team-standings.repository'

export interface TeamStandingsServiceAbstract {
  getOne({ championship }: { championship: string }): Promise<TeamStandings>
}

export class TeamStandingsService implements TeamStandingsServiceAbstract {
  private readonly teamStandingsRepository: TeamStandingsRepositoryAbstract

  constructor(teamStandingsRepository: TeamStandingsRepositoryAbstract) {
    this.teamStandingsRepository = teamStandingsRepository
  }

  async getOne({
    championship
  }: {
    championship: string
  }): Promise<TeamStandings> {
    return await this.teamStandingsRepository.getOne({ championship })
  }
}
