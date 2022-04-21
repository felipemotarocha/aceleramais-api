import TeamStandings from '../../entities/team-standings.entity'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import ChampionshipRepositoryStub, {
  validChampionship
} from '../../repositories/championship/championship.repository.stub'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import {
  DriverStandingsRepositoryStub,
  validDriverStandings
} from '../../repositories/driver-standings/driver-standings.repository.stub'
import { TeamStandingsRepositoryAbstract } from '../../repositories/team-standings/team-standings.repository'
import {
  TeamStandingsService,
  TeamStandingsServiceAbstract
} from './team-standings.service'

describe('Team Standings Service', () => {
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

  interface SutTypes {
    teamStandingsRepositoryStub: TeamStandingsRepositoryAbstract
    driverStandingsRepositoryStub: DriverStandingsRepositoryAbstract
    championshipRepositoryStub: ChampionshipRepositoryAbstract
    sut: TeamStandingsServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class TeamStandingsRepositoryStub
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

    const teamStandingsRepositoryStub = new TeamStandingsRepositoryStub()
    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const championshipRepositoryStub = new ChampionshipRepositoryStub()

    const sut = new TeamStandingsService(
      teamStandingsRepositoryStub,
      driverStandingsRepositoryStub,
      championshipRepositoryStub
    )

    return {
      teamStandingsRepositoryStub,
      driverStandingsRepositoryStub,
      championshipRepositoryStub,
      sut
    }
  }

  it('should get a TeamStandings by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual(validTeamStandings)
  })

  it('should call TeamStandingsRepository getOne method with correct values', async () => {
    const { sut, teamStandingsRepositoryStub } = makeSut()

    const getOneTeamStandingssSpy = jest.spyOn(
      teamStandingsRepositoryStub,
      'getOne'
    )

    await sut.getOne({ championship: 'valid_championship_id' })

    expect(getOneTeamStandingssSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should throws if TeamStandingsRepository getOne method throws', async () => {
    const { sut, teamStandingsRepositoryStub } = makeSut()

    jest
      .spyOn(teamStandingsRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getOne({ championship: 'invalid_championship_id' })

    expect(promise).rejects.toThrow()
  })

  it('should refresh the Team Standings', async () => {
    const {
      sut,
      driverStandingsRepositoryStub,
      championshipRepositoryStub,
      teamStandingsRepositoryStub
    } = makeSut()

    jest.spyOn(driverStandingsRepositoryStub, 'getOne').mockReturnValueOnce(
      Promise.resolve({
        ...validDriverStandings,
        standings: [
          {
            user: 'valid_id_2',
            position: 1,
            firstName: undefined,
            lastName: undefined,
            isRegistered: true,
            isRemoved: false,
            points: 20,
            team: {
              championship: 'valid_championship',
              id: 'valid_team_id_1',
              name: 'valid_name_1'
            }
          },
          {
            user: 'valid_id',
            position: 2,
            firstName: undefined,
            lastName: undefined,
            isRegistered: true,
            isRemoved: false,
            points: 16,
            team: {
              championship: 'valid_championship',
              id: 'valid_team_id_2',
              name: 'valid_name_2'
            }
          }
        ]
      })
    )

    jest.spyOn(championshipRepositoryStub, 'getOne').mockReturnValueOnce(
      Promise.resolve({
        ...validChampionship,
        teams: ['valid_team_id_1', 'valid_team_id_2']
      })
    )

    const updateSpy = jest.spyOn(teamStandingsRepositoryStub, 'update')

    await sut.refresh('valid_championship')

    expect(updateSpy).toHaveBeenCalledWith('valid_id', {
      standings: [
        { team: 'valid_team_id_1', points: 20, position: 1 },
        { team: 'valid_team_id_2', points: 16, position: 2 }
      ]
    })
  })
})
