import { Types } from 'mongoose'
import { env } from '../../config/env.config'

import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'
import { MongoChampionshipRepository } from './championship.repository'

describe('Mongo Driver Standings Repository', () => {
  //   const validChampionship = {
  //     id: new Types.ObjectId() as any,
  //     championship: new Types.ObjectId() as any,
  //     standings: [
  //       {
  //         user: new Types.ObjectId() as any,
  //         isRegistered: true,
  //         position: 1
  //       }
  //     ]
  //   }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await ChampionshipModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoChampionshipRepository(ChampionshipModel)

  it('should create a Championship', async () => {
    const sut = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [new Types.ObjectId() as any],
      teams: [new Types.ObjectId() as any],
      drivers: [{ user: new Types.ObjectId() as any, isRegistered: true }],
      scoringSystem: new Types.ObjectId() as any
    }

    const result = await sut.create(dto)

    expect(result.id).toBeTruthy()
    expect(result.description).toStrictEqual(dto.description)
    expect(result.name).toStrictEqual(dto.name)
    expect(result.platform).toStrictEqual(dto.platform)
    expect(result.avatarImageUrl).toStrictEqual(dto.avatarImageUrl)
    expect(result.races).toStrictEqual(dto.races)
    expect(result.teams).toStrictEqual(dto.teams)
    expect(result.drivers).toStrictEqual(dto.drivers)
    expect(result.scoringSystem).toStrictEqual(dto.scoringSystem)
  })

  it('should call ChampionshipModel with correct values', async () => {
    const sut = makeSut()

    const createChampionshipSpy = jest.spyOn(ChampionshipModel, 'create')

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [new Types.ObjectId() as any],
      teams: [new Types.ObjectId() as any],
      drivers: [{ user: new Types.ObjectId() as any, isRegistered: true }],
      scoringSystem: new Types.ObjectId() as any
    }

    await sut.create(dto)

    expect(createChampionshipSpy).toHaveBeenCalledWith(dto)
  })
})
