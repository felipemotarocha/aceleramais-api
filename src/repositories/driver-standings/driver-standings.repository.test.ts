import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import { CreateDriverStandingsDto } from '../../dtos/driver-standings.dto'
import MongooseHelper from '../../helpers/mongoose.helpers'
import DriverStandingsModel from '../../models/driver-standings.model'
import { MongoDriverStandingsRepository } from './driver-standings.repository'

describe('Mongo Driver Standings Repository', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await DriverStandingsModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoDriverStandingsRepository(DriverStandingsModel)

  it('should create a Scoring System', async () => {
    const sut = makeSut()

    const dto: CreateDriverStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          user: new Types.ObjectId() as any,
          isRegistered: true,
          position: 1
        }
      ]
    }

    const result = await sut.create(dto)

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.standings[0].user).toStrictEqual(dto.standings[0].user)
    expect(result.standings[0].isRegistered).toBe(dto.standings[0].isRegistered)
    expect(result.standings[0].position).toBe(dto.standings[0].position)
  })

  it('should call ScoringSystemModel create method with correct values', async () => {
    const sut = makeSut()

    const createScoringSystemSpy = jest.spyOn(DriverStandingsModel, 'create')

    const dto: CreateDriverStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          user: new Types.ObjectId() as any,
          isRegistered: true,
          position: 1
        }
      ]
    }
    await sut.create(dto)

    expect(createScoringSystemSpy).toHaveBeenCalledWith(dto)
  })
})
