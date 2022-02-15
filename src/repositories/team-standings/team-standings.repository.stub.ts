import TeamStandings from '../../entities/team-standings.entity'
import { TeamStandingsRepositoryAbstract } from './team-standings.repository'

export const validTeamStandings = {
  id: 'valid_id',
  championship: 'valid_championship',
  standings: [
    {
      team: 'valid_team',
      position: 1,
      points: 10
    }
  ]
}

export class TeamStandingsRepositoryStub
implements TeamStandingsRepositoryAbstract {
  async create(): Promise<TeamStandings> {
    return validTeamStandings
  }

  async getOne(): Promise<TeamStandings> {
    return validTeamStandings
  }

  async update(): Promise<TeamStandings> {
    return validTeamStandings
  }

  async delete(): Promise<TeamStandings> {
    return validTeamStandings
  }
}
