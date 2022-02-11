import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import { CreateBonificationDto } from '../../dtos/bonification.dtos'
import MongooseHelper from '../../helpers/mongoose.helpers'
import BonificationModel from '../../models/bonification.model'
import { MongoBonificationRepository } from './bonification.repository'

describe('Mongo Bonification Repository', () => {
  const validBonification = {
    id: new Types.ObjectId(),
    championship: new Types.ObjectId(),
    name: 'Volta mais rápida',
    points: 1
  }

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
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.name).toBe(dto.name)
    expect(result.points).toBe(dto.points)
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
})
