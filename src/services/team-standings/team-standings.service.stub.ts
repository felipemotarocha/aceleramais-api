import TeamStandings from '../../entities/team-standings.entity'
import { TeamStandingsServiceAbstract } from '../../services/team-standings/team-standings.service'

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

export default class TeamStandingsServiceStub
implements TeamStandingsServiceAbstract {
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

  async refresh(): Promise<TeamStandings> {
    return validTeamStandings
  }
}
