import DriverStandings from '../../entities/driver-standings.entity'
import { MissingParamError, ServerError } from '../../errors/controllers.errors'
import { DriverStandingsServiceAbstract } from '../../services/driver-standings/driver-standings.service'
import {
  DriverStandingsControllerAbstract,
  DriverStandingsController
} from './driver-standings.controller'

describe('Driver Standings Controller', () => {
  const validDriverStandings = {
    id: 'valid_id',
    championship: 'valid_championship',
    standings: [
      {
        user: 'valid_user',
        isRegistered: true,
        position: 1,
        points: 10
      }
    ]
  }

  interface SutTypes {
    driverStandingsServiceStub: DriverStandingsServiceAbstract
    sut: DriverStandingsControllerAbstract
  }

  const makeSut = (): SutTypes => {
    class DriverStandingsServiceStub implements DriverStandingsServiceAbstract {
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

      async refresh(): Promise<DriverStandings> {
        return validDriverStandings
      }
    }

    const driverStandingsServiceStub = new DriverStandingsServiceStub()
    const sut = new DriverStandingsController(driverStandingsServiceStub)

    return { sut, driverStandingsServiceStub }
  }

  it('should return 200 on getting a Driver Standings by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validDriverStandings)
  })

  it('should call DriverStandingsService getOne method with correct values', async () => {
    const { sut, driverStandingsServiceStub } = makeSut()

    const getOneDriverStandingssSpy = jest.spyOn(
      driverStandingsServiceStub,
      'getOne'
    )

    await sut.getOne({ query: { championship: 'valid_championship_id' } })

    expect(getOneDriverStandingssSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should return 400 when getting a DriverStandingss without providing a query', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ query: undefined })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('query'))
  })

  it('should return 400 when getting a DriverStandingss without providing a Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ query: { championship: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 500 if DriverStandingsService getOne method throws', async () => {
    const { sut, driverStandingsServiceStub } = makeSut()

    jest
      .spyOn(driverStandingsServiceStub, 'getOne')
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
