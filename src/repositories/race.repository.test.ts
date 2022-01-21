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

  it('should get a Race by ID', async () => {
    const sut = makeSut()

    const dto = {
      id: new Types.ObjectId() as any,
      championship: new Types.ObjectId() as any,
      classification: new Types.ObjectId() as any,
      startDate: 'valid_start_date'
    }

    await RaceModel.create([{ _id: dto.id, ...dto }])

    const result = await sut.getOne(dto.id)

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.classification).toStrictEqual(dto.classification)
    expect(result.startDate).toBe(dto.startDate)
  })

  it('should call RaceModel findById method with correct values', async () => {
    const sut = makeSut()

    const createCollectionSpy = jest.spyOn(RaceModel, 'findById')

    const dto = {
      id: new Types.ObjectId() as any,
      championship: new Types.ObjectId() as any,
      classification: new Types.ObjectId() as any,
      startDate: 'valid_start_date'
    }

    await RaceModel.create([{ _id: dto.id, ...dto }])

    await sut.getOne(dto.id)

    expect(createCollectionSpy).toHaveBeenCalledWith(dto.id)
  })

  it('should get all races', async () => {
    const sut = makeSut()

    const dto = {
      id: new Types.ObjectId() as any,
      championship: new Types.ObjectId() as any,
      classification: new Types.ObjectId() as any,
      startDate: 'valid_start_date'
    }

    await RaceModel.create([{ _id: dto.id, ...dto }])

    const result = await sut.getAll({ championship: dto.championship })

    expect(result[0].id).toBeTruthy()
    expect(result[0].championship).toStrictEqual(dto.championship)
    expect(result[0].classification).toStrictEqual(dto.classification)
    expect(result[0].startDate).toBe(dto.startDate)
  })

  it('should call RaceModel find method with correct values', async () => {
    const sut = makeSut()

    const createCollectionSpy = jest.spyOn(RaceModel, 'find')

    const dto = {
      id: new Types.ObjectId() as any,
      championship: new Types.ObjectId() as any,
      classification: new Types.ObjectId() as any,
      startDate: 'valid_start_date'
    }

    await RaceModel.create([{ _id: dto.id, ...dto }])

    await sut.getAll({ championship: dto.championship })

    expect(createCollectionSpy).toHaveBeenCalledWith({
      championship: dto.championship
    })
  })

  it('should update a Race', async () => {
    const sut = makeSut()

    const dto = {
      id: new Types.ObjectId(),
      startDate: 'new_start_date',
      championship: new Types.ObjectId()
    }

    await RaceModel.create([{ _id: dto.id, ...dto }])

    const result = await sut.update(dto.id.toHexString(), {
      startDate: dto.startDate
    })

    expect(result.id).toBeTruthy()
    expect(result.startDate).toBe(dto.startDate)
  })

  it('should call RaceModel findByIdAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateCollectionSpy = jest.spyOn(RaceModel, 'findByIdAndUpdate')
    const dto = {
      id: new Types.ObjectId(),
      startDate: 'new_start_date',
      championship: new Types.ObjectId()
    }

    await RaceModel.create([{ _id: dto.id, ...dto }])

    await sut.update(dto.id.toHexString(), { startDate: dto.startDate })

    expect(updateCollectionSpy).toHaveBeenCalledWith(dto.id.toHexString(), {
      startDate: dto.startDate
    })
  })
})
