import { CreateDriverStandingsDto } from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings'
import { MissingParamError } from '../../errors/controllers.errors'
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
        position: 1
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
    }

    const driverStandingsServiceStub = new DriverStandingsServiceStub()
    const sut = new DriverStandingsController(driverStandingsServiceStub)

    return { sut, driverStandingsServiceStub }
  }

  it('should return 201 on creation success', async () => {
    const { sut } = makeSut()

    const dto: CreateDriverStandingsDto = {
      championship: 'valid_championship',
      standings: [
        {
          user: 'valid_user',
          isRegistered: true,
          position: 1
        }
      ]
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validDriverStandings)
  })

  it('should call DriverStandingsService create method with correct values', async () => {
    const { sut, driverStandingsServiceStub } = makeSut()

    const createDriverStandingsSpy = jest.spyOn(
      driverStandingsServiceStub,
      'create'
    )

    const dto: CreateDriverStandingsDto = {
      championship: 'valid_championship',
      standings: [
        {
          user: 'valid_user',
          isRegistered: true,
          position: 1
        }
      ]
    }

    await sut.create({ body: dto })

    expect(createDriverStandingsSpy).toHaveBeenCalledWith(dto)
  })

  it('should return 400 if no championship is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      standings: [
        {
          user: 'valid_user',
          isRegistered: true,
          position: 1
        }
      ]
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 400 if no standings is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('standings'))
  })
})