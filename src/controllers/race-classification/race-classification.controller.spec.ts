import { UpdateRaceClassificationDto } from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'

import { RaceClassificationServiceAbstract } from '../../services/race-classification/race-classification.service'
import RaceClassificationController, {
  RaceClassificationControllerAbstract
} from './race-classification.controller'

describe('Race Classification Controller', () => {
  const validRaceClassification: RaceClassification = {
    id: 'valid_id',
    race: 'valid_id',
    classification: [
      {
        position: 1,
        user: 'valid_id',
        team: 'valid_id',
        isRegistered: true,
        hasFastestLap: true,
        hasPolePosition: true
      }
    ]
  }

  interface SutTypes {
    sut: RaceClassificationControllerAbstract
    raceClassificationServiceStub: RaceClassificationServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class RaceClassificationServiceStub
    implements RaceClassificationServiceAbstract {
      async create(): Promise<RaceClassification> {
        return validRaceClassification
      }

      async getOne(): Promise<RaceClassification> {
        return validRaceClassification
      }

      async update(): Promise<RaceClassification> {
        return validRaceClassification
      }
    }

    const raceClassificationServiceStub = new RaceClassificationServiceStub()
    const sut = new RaceClassificationController(raceClassificationServiceStub)

    return { sut, raceClassificationServiceStub }
  }

  it('should return 200 on getting a Race Classification by Race', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({
      query: {
        race: validRaceClassification.race
      }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validRaceClassification)
  })

  it('should return 400 on getting a Race Classification without providing a Race', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({
      query: {
        race: null as any
      }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('race'))
  })

  it('should return 400 if RaceClassificationService getOne method throws', async () => {
    const { sut, raceClassificationServiceStub } = makeSut()

    jest
      .spyOn(raceClassificationServiceStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getOne({
      query: {
        race: validRaceClassification.race
      }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on update success', async () => {
    const { sut } = makeSut()

    const dto: UpdateRaceClassificationDto = {
      classification: [
        {
          position: 1,
          user: 'valid_id',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update({
      query: { race: 'valid_id' },
      body: dto
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validRaceClassification)
  })

  it('should return 400 on updating a Race Classification without providing a Race', async () => {
    const { sut } = makeSut()

    const dto: UpdateRaceClassificationDto = {
      classification: [
        {
          position: 1,
          user: 'valid_id',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update({
      query: {
        race: null as any
      },
      body: dto
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('race'))
  })

  it('should return 400 when providing an unallowed update', async () => {
    const { sut } = makeSut()

    const result = await sut.update({
      body: { race: 'valid_id' },
      query: { race: 'valid_id' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new NotAllowedFieldsError())
  })

  it('should return 400 if RaceClassificationService update method throws', async () => {
    const { sut, raceClassificationServiceStub } = makeSut()

    jest
      .spyOn(raceClassificationServiceStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto: UpdateRaceClassificationDto = {
      classification: [
        {
          position: 1,
          user: 'valid_id',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update({
      query: { race: 'valid_id' },
      body: dto
    })
    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 400 if user is null and isRegistered is true', async () => {
    const { sut } = makeSut()

    const dto = {
      classification: [
        {
          position: 1,
          userName: 'valid_userName',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update({
      body: dto,
      query: { race: 'valid_race' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(
      new Error('Some user provided on the classification is invalid.')
    )
  })

  it('should return 400 if user and userName are provided', async () => {
    const { sut } = makeSut()

    const dto = {
      classification: [
        {
          position: 1,
          user: 'valid_user',
          userName: 'valid_user_name',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update({
      body: dto,
      query: { race: 'valid_race' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(
      new Error('Some user provided on the classification is invalid.')
    )
  })

  it('should return 400 if userName are provided and isRegistered is true', async () => {
    const { sut } = makeSut()

    const dto = {
      classification: [
        {
          position: 1,
          userName: 'valid_user_name',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update({
      body: dto,
      query: { race: 'valid_race' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(
      new Error('Some user provided on the classification is invalid.')
    )
  })

  it('should return 400 if user is provided and isRegistered is false', async () => {
    const { sut } = makeSut()

    const dto = {
      classification: [
        {
          position: 1,
          user: 'valid_user',
          userName: 'valid_user_name',
          team: 'valid_id',
          isRegistered: false,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update({
      body: dto,
      query: { race: 'valid_race' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(
      new Error('Some user provided on the classification is invalid.')
    )
  })
})
