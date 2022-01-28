import { Types } from 'mongoose'
import Championship from '../../entities/championship.entity'
import DriverStandings from '../../entities/driver-standings'
import ScoringSystem from '../../entities/scoring-system.entity'
import TeamStandings from '../../entities/team-standings.entity'
import Team from '../../entities/team.entity'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'
import { TeamStandingsRepositoryAbstract } from '../../repositories/team-standings/team-standings.repository'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'
import { TeamStandingsServiceAbstract } from '../team-standings/team-standings.service'
import {
  ChampionshipServiceAbstract,
  ChampionshipService
} from './championship.service'

describe('Championship Service', () => {
  const validChampionship: Championship = {
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

  const validTeam: Team = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    name: 'Mercedes',
    color: '#fff'
  }

  const validDriverStandings = {
    id: 'valid_id',
    championship: 'valid_championship',
    standings: [
      {
        user: 'valid_user',
        isRegistered: true,
        position: 1
      }
    ]
  }

  const validTeamStandings = {
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

  const validScoringSystem = {
    id: 'valid_id',
    championship: 'valid_championship',
    scoringSystem: { 1: 25, 2: 20 }
  }

  interface SutTypes {
    championshipStandingsRepositoryStub: ChampionshipRepositoryAbstract
    teamRepositoryStub: TeamRepositoryAbstract
    driverStandingsRepositoryStub: DriverStandingsRepositoryAbstract
    teamStandingsRepositoryStub: TeamStandingsRepositoryAbstract
    scoringSystemRepositoryStub: ScoringSystemRepositoryAbstract
    sut: ChampionshipServiceAbstract
  }
  const makeSut = (): SutTypes => {
    class ChampionshipRepositoryStub implements ChampionshipRepositoryAbstract {
      async create(): Promise<Championship> {
        return validChampionship
      }

      async getOne(): Promise<Championship> {
        return validChampionship
      }
    }

    class TeamRepositoryStub implements TeamRepositoryAbstract {
      async create(): Promise<Team> {
        return validTeam
      }

      async bulkCreate(): Promise<Team[]> {
        return [validTeam]
      }

      async getAll(): Promise<Team[]> {
        return [validTeam]
      }

      async update(): Promise<Team> {
        return validTeam
      }

      async delete(): Promise<Team> {
        return validTeam
      }
    }

    class DriverStandingsRepositoryStub
    implements DriverStandingsRepositoryAbstract {
      async create(): Promise<DriverStandings> {
        return validDriverStandings
      }

      async getOne(): Promise<DriverStandings> {
        return validDriverStandings
      }

      async update(): Promise<DriverStandings> {
        return validDriverStandings
      }

      async delete(): Promise<DriverStandings> {
        return validDriverStandings
      }
    }

    class TeamStandingsServiceStub implements TeamStandingsServiceAbstract {
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

    class ScoringSystemRepositoryStub
    implements ScoringSystemRepositoryAbstract {
      async create(): Promise<ScoringSystem> {
        return validScoringSystem
      }

      async getOne(): Promise<ScoringSystem> {
        return validScoringSystem
      }

      async update(): Promise<ScoringSystem> {
        return validScoringSystem
      }

      async delete(): Promise<ScoringSystem> {
        return validScoringSystem
      }
    }

    const teamRepositoryStub = new TeamRepositoryStub()
    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const championshipStandingsRepositoryStub = new ChampionshipRepositoryStub()
    const teamStandingsRepositoryStub = new TeamStandingsServiceStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()

    const sut = new ChampionshipService(
      championshipStandingsRepositoryStub,
      teamRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub
    )

    return {
      championshipStandingsRepositoryStub,
      teamRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub,
      sut
    }
  }

  it('should create the Championship Teams', async () => {
    const { sut, teamRepositoryStub } = makeSut()

    const createTeamSpy = jest.spyOn(teamRepositoryStub, 'bulkCreate')

    await sut.create(validChampionship.id, {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25 }
    })

    expect(createTeamSpy).toHaveBeenCalledWith([
      {
        championship: validChampionship.id,
        name: 'valid_name',
        color: 'valid_color'
      }
    ])
    expect(createTeamSpy).toHaveReturned()
  })

  it('should create the Championship Driver Standings', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const createDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'create'
    )

    await sut.create(validChampionship.id, {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25 }
    })

    expect(createDriverStandingsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      standings: []
    })
    expect(createDriverStandingsSpy).toHaveReturned()
  })

  it('should create the Championship Team Standings', async () => {
    const { sut, teamStandingsRepositoryStub } = makeSut()

    const createTeamStandingsSpy = jest.spyOn(
      teamStandingsRepositoryStub,
      'create'
    )

    await sut.create(validChampionship.id, {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25 }
    })

    expect(createTeamStandingsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      standings: []
    })
    expect(createTeamStandingsSpy).toHaveReturned()
  })

  it('should create the Championship Scoring System', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    const createScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'create'
    )

    await sut.create(validChampionship.id, {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25 }
    })

    expect(createScoringSystemSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      scoringSystem: { 1: 25 }
    })
    expect(createScoringSystemSpy).toHaveReturned()
  })
})
