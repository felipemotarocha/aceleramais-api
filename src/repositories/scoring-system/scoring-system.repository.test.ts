import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import {
  CreateScoringSystemDto,
  UpdateScoringSystemDto
} from '../../dtos/scoring-system.dtos'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ScoringSystemModel from '../../models/scoring-system.model'
import { MongoScoringSystemRepository } from './scoring-system.repository'

describe('Mongo Scoring System Repository', () => {
  const validScoringSystem = {
    id: new Types.ObjectId(),
    championship: new Types.ObjectId(),
    scoringSystem: { 1: 25, 2: 20 }
  }

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

  it('should get a Scoring System by Championship', async () => {
    const sut = makeSut()

    await ScoringSystemModel.create({
      _id: validScoringSystem.id,
      ...validScoringSystem
    })

    const result = await sut.getOne({
      championship: validScoringSystem.championship as any
    })

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(validScoringSystem.championship)
    expect(result.scoringSystem).toStrictEqual(validScoringSystem.scoringSystem)
  })

  it('should call ScoringSystemModel getOne method with correct values', async () => {
    const sut = makeSut()

    await ScoringSystemModel.create({
      _id: validScoringSystem.id,
      ...validScoringSystem
    })

    const getOneScoringSystemSpy = jest.spyOn(ScoringSystemModel, 'findOne')

    await sut.getOne({
      championship: validScoringSystem.championship as any
    })

    expect(getOneScoringSystemSpy).toHaveBeenCalledWith({
      championship: validScoringSystem.championship as any
    })
  })

  it('should update a Scoring System', async () => {
    const sut = makeSut()

    await ScoringSystemModel.create([
      { _id: validScoringSystem.id, ...validScoringSystem }
    ])

    const dto: UpdateScoringSystemDto = {
      scoringSystem: { 1: 30, 2: 25 }
    }

    const result = await sut.update(validScoringSystem.id.toHexString(), dto)

    expect(result.id).toBeTruthy()
    expect(result.scoringSystem).toStrictEqual(dto.scoringSystem)
  })

  it('should call ScoringSystemModel findByIdAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateCollectionSpy = jest.spyOn(
      ScoringSystemModel,
      'findByIdAndUpdate'
    )

    await ScoringSystemModel.create([
      { _id: validScoringSystem.id, ...validScoringSystem }
    ])

    const dto: UpdateScoringSystemDto = {
      scoringSystem: { 1: 30, 2: 25 }
    }

    await sut.update(validScoringSystem.id.toHexString(), dto)

    expect(updateCollectionSpy).toHaveBeenCalledWith(
      validScoringSystem.id.toHexString(),
      dto,
      { new: true }
    )
  })
})
