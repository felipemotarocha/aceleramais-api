import { MissingParamError, ServerError } from '../../errors/controllers.errors'
import { TeamStandingsServiceAbstract } from '../../services/team-standings/team-standings.service'
import TeamStandingsServiceStub, {
  validTeamStandings
} from '../../services/team-standings/team-standings.service.stub'
import {
  TeamStandingsControllerAbstract,
  TeamStandingsController
} from './team-standings.controller'

describe('Team Standings Controller', () => {
  interface SutTypes {
    teamStandingsServiceStub: TeamStandingsServiceAbstract
    sut: TeamStandingsControllerAbstract
  }

  const makeSut = (): SutTypes => {
    const teamStandingsServiceStub = new TeamStandingsServiceStub()
    const sut = new TeamStandingsController(teamStandingsServiceStub)

    return { sut, teamStandingsServiceStub }
  }

  it('should return 200 on getting a Team Standings by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validTeamStandings)
  })

  it('should call TeamStandingsService getOne method with correct values', async () => {
    const { sut, teamStandingsServiceStub } = makeSut()

    const getOneTeamStandingssSpy = jest.spyOn(
      teamStandingsServiceStub,
      'getOne'
    )

    await sut.getOne({ query: { championship: 'valid_championship_id' } })

    expect(getOneTeamStandingssSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should return 400 when getting a TeamStandings without providing a query', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ query: undefined })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('query'))
  })

  it('should return 400 when getting a TeamStandings without providing a Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ query: { championship: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 500 if TeamStandingsService getOne method throws', async () => {
    const { sut, teamStandingsServiceStub } = makeSut()

    jest
      .spyOn(teamStandingsServiceStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getOne({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })
})
