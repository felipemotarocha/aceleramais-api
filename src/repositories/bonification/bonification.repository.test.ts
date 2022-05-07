import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import {
  CreateBonificationDto,
  UpdateBonificationDto
} from '../../dtos/bonification.dtos'
import MongooseHelper from '../../helpers/mongoose.helpers'
import BonificationModel from '../../models/bonification.model'
import { MongoBonificationRepository } from './bonification.repository'
import { validBonification } from './bonification.repository.stub'

describe('Mongo Bonification Repository', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await BonificationModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoBonificationRepository(BonificationModel)

  it('should create a Bonification', async () => {
    const sut = makeSut()

    const dto: CreateBonificationDto = {
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

  it('should create Bonifications', async () => {
    const sut = makeSut()

    const dto: CreateBonificationDto = {
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

  it('should call BonificationModel create method with correct values', async () => {
    const sut = makeSut()

    const createBonificationSpy = jest.spyOn(BonificationModel, 'create')

    const dto: CreateBonificationDto = {
      championship: new Types.ObjectId() as any,
      name: 'Volta mais rápida',
      points: 1
    }

    await sut.create(dto)

    expect(createBonificationSpy).toHaveBeenCalledWith(dto)
  })

  it('should get all Bonifications by Championship', async () => {
    const sut = makeSut()

    await BonificationModel.create({
      _id: validBonification.id,
      ...validBonification
    })

    const result = await sut.getAll({
      championship: validBonification.championship
    })

    expect(result[0].id).toStrictEqual(validBonification.id)
    expect(result[0].championship).toBeTruthy()
    expect(result[0].name).toBe(validBonification.name)
    expect(result[0].points).toBe(validBonification.points)
  })

  it('should call BonificationModel find method with correct values', async () => {
    const sut = makeSut()

    const createBonificationSpy = jest.spyOn(BonificationModel, 'find')

    await BonificationModel.create({
      _id: validBonification.id,
      ...validBonification
    })

    await sut.getAll({
      championship: validBonification.championship as any
    })

    expect(createBonificationSpy).toHaveBeenCalledWith({
      championship: validBonification.championship
    })
  })

  it('should update a Bonification', async () => {
    const sut = makeSut()

    await BonificationModel.create([
      { _id: validBonification.id, ...validBonification }
    ])

    const dto: UpdateBonificationDto = {
      points: 2
    }

    const result = await sut.update(validBonification.id, dto)

    expect(result.id).toBeTruthy()
    expect(result.points).toStrictEqual(dto.points)
  })

  it('should call BonificationModel findByIdAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateCollectionSpy = jest.spyOn(
      BonificationModel,
      'findByIdAndUpdate'
    )

    await BonificationModel.create([
      { _id: validBonification.id, ...validBonification }
    ])

    const dto: UpdateBonificationDto = {
      points: 2
    }

    await sut.update(validBonification.id, dto)

    expect(updateCollectionSpy).toHaveBeenCalledWith(
      validBonification.id,
      dto,
      { new: true }
    )
  })

  it('should delete a Bonification', async () => {
    const sut = makeSut()

    await BonificationModel.create({
      _id: validBonification.id,
      ...validBonification
    })

    const result = await sut.delete(validBonification.id)

    expect(result.id).toBeTruthy()
    expect(result.championship).toBeTruthy()
  })

  it('should call BonificationModel findByIdAndDelete method with correct values', async () => {
    const sut = makeSut()

    const deleteBonificationSpy = jest.spyOn(
      BonificationModel,
      'findByIdAndDelete'
    )

    await BonificationModel.create({
      _id: validBonification.id,
      ...validBonification
    })

    await sut.delete(validBonification.id)

    expect(deleteBonificationSpy).toHaveBeenCalledWith(validBonification.id, {
      new: true
    })
  })

  it('should delete Bonifications', async () => {
    const sut = makeSut()

    await BonificationModel.create({
      _id: validBonification.id,
      ...validBonification
    })

    const result = await sut.bulkDelete({
      ids: [validBonification.id]
    })

    expect(result).toBe(1)
  })
})
