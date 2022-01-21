import { Types } from 'mongoose'
import { env } from '../config/env.config'
import { CreateRaceDto } from '../dtos/race.dtos'
import MongooseHelper from '../helpers/mongoose.helpers'
import RaceModel from '../models/race.model'
import MongoRaceRepository from './race.repository'

describe('Mongo Race Repository', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await RaceModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoRaceRepository(RaceModel)

  it('should create a Race', async () => {
    const sut = makeSut()

    const dto: CreateRaceDto = {
      championship: new Types.ObjectId() as any,
      classification: new Types.ObjectId() as any,
      startDate: 'valid_start_date'
    }

    const result = await sut.create(dto)

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.classification).toStrictEqual(dto.classification)
    expect(result.startDate).toBe(dto.startDate)
  })

  it('should call RaceModel create method with correct values', async () => {
    const sut = makeSut()

    const createCollectionSpy = jest.spyOn(RaceModel, 'create')

    const dto: CreateRaceDto = {
      championship: new Types.ObjectId() as any,
      classification: new Types.ObjectId() as any,
      startDate: 'valid_start_date'
    }

    await sut.create(dto)

    expect(createCollectionSpy).toHaveBeenCalledWith(dto)
  })
})
