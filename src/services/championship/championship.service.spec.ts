import { Types } from 'mongoose'
import Championship from '../../entities/championship.entity'
import Team from '../../entities/team.entity'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'
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

  interface SutTypes {
    championshipStandingsRepositoryStub: ChampionshipRepositoryAbstract
    teamRepositoryStub: TeamRepositoryAbstract
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

    const teamRepositoryStub = new TeamRepositoryStub()
    const championshipStandingsRepositoryStub = new ChampionshipRepositoryStub()

    const sut = new ChampionshipService(
      championshipStandingsRepositoryStub,
      teamRepositoryStub
    )

    return { championshipStandingsRepositoryStub, teamRepositoryStub, sut }
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
})
