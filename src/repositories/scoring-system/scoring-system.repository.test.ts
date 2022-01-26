import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import { CreateScoringSystemDto } from '../../dtos/scoring-system.dtos'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ScoringSystemModel from '../../models/scoring-system.model'
import { MongoScoringSystemRepository } from './scoring-system.repository'

describe('Mongo Scoring System Repository', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await ScoringSystemModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoScoringSystemRepository(ScoringSystemModel)

  it('should create a Scoring System', async () => {
    const sut = makeSut()

    const dto: CreateScoringSystemDto = {
      championship: new Types.ObjectId() as any,
      scoringSystem: { 1: 25, 2: 20 }
    }

    const result = await sut.create(dto)

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.scoringSystem).toStrictEqual(dto.scoringSystem)
  })

  it('should call ScoringSystemModel create method with correct values', async () => {
    const sut = makeSut()

    const createScoringSystemSpy = jest.spyOn(ScoringSystemModel, 'create')

    const dto: CreateScoringSystemDto = {
      championship: new Types.ObjectId() as any,
      scoringSystem: { 1: 25, 2: 20 }
    }

    await sut.create(dto)

    expect(createScoringSystemSpy).toHaveBeenCalledWith(dto)
  })
})
