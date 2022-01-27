import TeamStandings from '../../entities/team-standings.entity'
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
    const sut = new TeamStandingsService(teamStandingsRepositoryStub)

    return { teamStandingsRepositoryStub, sut }
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
})
