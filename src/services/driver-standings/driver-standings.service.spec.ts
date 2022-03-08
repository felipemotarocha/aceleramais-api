import { CreateDriverStandingsDto } from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings.entity'
import { BonificationRepositoryStub } from '../../repositories/bonification/bonification.repository.stub'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { PenaltyRepositoryStub } from '../../repositories/penalty/penalty.repository.stub'
import { RaceClassificationRepositoryStub } from '../../repositories/race-classification/race-classification.repository.stub'
import { RaceRepositoryStub } from '../../repositories/race/race.repository.stub'
import { ScoringSystemRepositoryStub } from '../../repositories/scoring-system/scoring-system.repository.stub'
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
        position: 1,
        points: 10
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
    const raceRepositoryStub = new RaceRepositoryStub()
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const bonificationRepositoryStub = new BonificationRepositoryStub()
    const penaltyRepositoryStub = new PenaltyRepositoryStub()

    const sut = new DriverStandingsService(
      driverStandingsRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub,
      scoringSystemRepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub
    )

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
          position: 1,
          points: 10
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
          position: 1,
          points: 10
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
          position: 1,
          points: 10
        }
      ]
    }
    const promise = sut.create(dto)

    expect(promise).rejects.toThrow()
  })

  it('should get a DriverStandings by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual(validDriverStandings)
  })

  it('should call DriverStandingsRepository getOne method with correct values', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const getOneDriverStandingssSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'getOne'
    )

    await sut.getOne({ championship: 'valid_championship_id' })

    expect(getOneDriverStandingssSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should throws if DriverStandingsRepository getOne method throws', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    jest
      .spyOn(driverStandingsRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getOne({ championship: 'invalid_championship_id' })

    expect(promise).rejects.toThrow()
  })

  it('should call DriverStandingsRepository update method with correct values', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const updateDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'update'
    )

    await sut.update('valid_id', {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          position: 1,
          points: 10
        }
      ]
    })

    expect(updateDriverStandingsSpy).toHaveBeenCalledWith('valid_id', {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          position: 1,
          points: 10
        }
      ]
    })
  })

  it('should throws if DriverStandingsRepository update method throws', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    jest
      .spyOn(driverStandingsRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.update('invalid_id', {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          position: 1,
          points: 10
        }
      ]
    })

    expect(promise).rejects.toThrow()
  })
})
