import { isEmpty } from 'lodash'

import TeamStandings from '../../entities/team-standings.entity'
import DriverStandings from '../../entities/driver-standings.entity'
import Team from '../../entities/team.entity'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { TeamStandingsRepositoryAbstract } from '../../repositories/team-standings/team-standings.repository'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'

export interface TeamStandingsServiceAbstract {
  getOne({ championship }: { championship: string }): Promise<TeamStandings>
  refresh(championship: string): Promise<TeamStandings>
}

export class TeamStandingsService implements TeamStandingsServiceAbstract {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly teamStandingsRepository: TeamStandingsRepositoryAbstract,
    private readonly driverStandingsRepository: DriverStandingsRepositoryAbstract,
    private readonly championshipRepository: ChampionshipRepositoryAbstract
  ) {}

  async refresh(championship: string): Promise<TeamStandings> {
    const driverStandings = await this.driverStandingsRepository.getOne({
      championship
    })

    const teamStandings = await this.teamStandingsRepository.getOne({
      championship
    })

    if (isEmpty(driverStandings.standings)) {
      return await this.teamStandingsRepository.update(teamStandings.id, {
        standings: []
      })
    }

    const teams = await (
      await this.championshipRepository.getOne({ id: championship })
    ).teams

    // Normalize data
    const driversPerTeam: { [team: string]: DriverStandings['standings'] } = {}

    for (const driver of driverStandings.standings) {
      if (!driver.team) continue

      driversPerTeam[(driver.team as Team).id]
        ? driversPerTeam[(driver.team as Team).id].push(driver)
        : (driversPerTeam[(driver.team as Team).id] = [driver])
    }

    const newTeamStandings: {
      team: string
      position: number
      points: number
    }[] = teams.map((team) => {
      const points = driversPerTeam[team]?.reduce(
        (acc, current) => acc + current.points,
        0
      )

      return { team, points: points || 0, position: 0 }
    })

    const newTeamStandingsWithPositions = newTeamStandings
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({ ...item, position: index + 1 }))

    return await this.teamStandingsRepository.update(teamStandings.id, {
      standings: newTeamStandingsWithPositions
    })
  }

  async getOne({
    championship
  }: {
    championship: string
  }): Promise<TeamStandings> {
    return await this.teamStandingsRepository.getOne({ championship })
  }
}
