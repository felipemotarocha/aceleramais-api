import { CreateDriverStandingsDto } from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import {
  DriverStandingsService,
  DriverStandingsServiceAbstract
} from './driver-standings.service'

describe('Driver Standings Service', () => {
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
    driverStandingsRepositoryStub: DriverStandingsRepositoryAbstract
    sut: DriverStandingsServiceAbstract
  }

  const makeSut = (): SutTypes => {
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

    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const sut = new DriverStandingsService(driverStandingsRepositoryStub)

    return { driverStandingsRepositoryStub, sut }
  }

  it('should create a Driver Standings', async () => {
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

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validDriverStandings)
  })

  it('should call DriverStandingsRepository create method with correct values', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const createDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
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

    await sut.create(dto)

    expect(createDriverStandingsSpy).toHaveBeenCalledWith(dto)
  })

  it('should throws if DriverStandingsRepository create method throws', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    jest
      .spyOn(driverStandingsRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
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
    const promise = sut.create(dto)

    expect(promise).rejects.toThrow()
  })
})
