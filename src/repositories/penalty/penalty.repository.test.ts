import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import { CreatePenaltyDto, UpdatePenaltyDto } from '../../dtos/penalty.dtos'
import MongooseHelper from '../../helpers/mongoose.helpers'
import PenaltyModel from '../../models/penalty.model'
import { MongoPenaltyRepository } from './penalty.repository'
import { validPenalty } from './penalty.repository.stub'

describe('Mongo Penalty Repository', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await PenaltyModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoPenaltyRepository(PenaltyModel)

  it('should create a Penalty', async () => {
    const sut = makeSut()

    const dto: CreatePenaltyDto = {
      championship: new Types.ObjectId() as any,
      name: 'Volta mais rápida',
      points: 1
    }

    const result = await sut.create(dto)

    expect(result.id).toBeTruthy()
    expect(result.championship).toBeTruthy()
    expect(result.name).toBe(dto.name)
    expect(result.points).toBe(dto.points)
  })

  it('should create Penalties', async () => {
    const sut = makeSut()

    const dto: CreatePenaltyDto = {
      championship: new Types.ObjectId() as any,
      name: 'Volta mais rápida',
      points: 1
    }

    const result = await sut.bulkCreate({ dto: [dto] })

    expect(result[0].id).toBeTruthy()
    expect(result[0].championship).toBeTruthy()
    expect(result[0].name).toBe(dto.name)
    expect(result[0].points).toBe(dto.points)
  })

  it('should call PenaltyModel create method with correct values', async () => {
    const sut = makeSut()

    const createPenaltySpy = jest.spyOn(PenaltyModel, 'create')

    const dto: CreatePenaltyDto = {
      championship: new Types.ObjectId() as any,
      name: 'Volta mais rápida',
      points: 1
    }

    await sut.create(dto)

    expect(createPenaltySpy).toHaveBeenCalledWith(dto)
  })

  it('should get all Penaltys by Championship', async () => {
    const sut = makeSut()

    await PenaltyModel.create({
      _id: validPenalty.id,
      ...validPenalty
    })

    const result = await sut.getAll({
      championship: validPenalty.championship
    })

    expect(result[0].id).toStrictEqual(validPenalty.id)
    expect(result[0].championship).toBeTruthy()
    expect(result[0].name).toBe(validPenalty.name)
    expect(result[0].points).toBe(validPenalty.points)
  })

  it('should call PenaltyModel find method with correct values', async () => {
    const sut = makeSut()

    const createPenaltySpy = jest.spyOn(PenaltyModel, 'find')

    await PenaltyModel.create({
      _id: validPenalty.id,
      ...validPenalty
    })

    await sut.getAll({
      championship: validPenalty.championship as any
    })

    expect(createPenaltySpy).toHaveBeenCalledWith({
      championship: validPenalty.championship
    })
  })

  it('should update a Penalty', async () => {
    const sut = makeSut()

    await PenaltyModel.create([{ _id: validPenalty.id, ...validPenalty }])

    const dto: UpdatePenaltyDto = {
      points: 2
    }

    const result = await sut.update(validPenalty.id, dto)

    expect(result.id).toBeTruthy()
    expect(result.points).toStrictEqual(dto.points)
  })

  it('should call PenaltyModel findByIdAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateCollectionSpy = jest.spyOn(PenaltyModel, 'findByIdAndUpdate')

    await PenaltyModel.create([{ _id: validPenalty.id, ...validPenalty }])

    const dto: UpdatePenaltyDto = {
      points: 2
    }

    await sut.update(validPenalty.id, dto)

    expect(updateCollectionSpy).toHaveBeenCalledWith(validPenalty.id, dto, {
      new: true
    })
  })

  it('should delete a Penalty', async () => {
    const sut = makeSut()

    await PenaltyModel.create({
      _id: validPenalty.id,
      ...validPenalty
    })

    const result = await sut.delete(validPenalty.id)

    expect(result.id).toBeTruthy()
    expect(result.championship).toBeTruthy()
  })

  it('should call PenaltyModel findByIdAndDelete method with correct values', async () => {
    const sut = makeSut()

    const deletePenaltySpy = jest.spyOn(PenaltyModel, 'findByIdAndDelete')

    await PenaltyModel.create({
      _id: validPenalty.id,
      ...validPenalty
    })

    await sut.delete(validPenalty.id)

    expect(deletePenaltySpy).toHaveBeenCalledWith(validPenalty.id, {
      new: true
    })
  })

  it('should delete Penalties', async () => {
    const sut = makeSut()

    await PenaltyModel.create({
      _id: validPenalty.id,
      ...validPenalty
    })

    const result = await sut.bulkDelete({
      ids: [validPenalty.id]
    })

    expect(result).toBeTruthy()
  })
})
