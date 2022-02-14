import { Types } from 'mongoose'
import { env } from '../../config/env.config'

import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'
import { MongoChampionshipRepository } from './championship.repository'

describe('Mongo Driver Standings Repository', () => {
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
      drivers: [
        {
          user: 'valid_user',
          isRegistered: true,
          bonifications: [],
          penalties: []
        }
      ],
      scoringSystem: new Types.ObjectId() as any,
      admins: [{ user: 'valid_user', isCreator: true }],
      teamStandings: new Types.ObjectId() as any,
      driverStandings: new Types.ObjectId() as any
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

  it('should call ChampionshipModel create method with correct values', async () => {
    const sut = makeSut()

    const createChampionshipSpy = jest.spyOn(ChampionshipModel, 'create')

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [new Types.ObjectId() as any],
      teams: [new Types.ObjectId() as any],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      teamStandings: new Types.ObjectId() as any,
      driverStandings: new Types.ObjectId() as any,
      scoringSystem: new Types.ObjectId() as any,
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    await sut.create(dto)

    expect(createChampionshipSpy).toHaveBeenCalledWith(dto)
  })

  it('should get a Championship by ID', async () => {
    const sut = makeSut()

    const dto = {
      id: new Types.ObjectId(),
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [new Types.ObjectId() as any],
      teams: [new Types.ObjectId() as any],
      drivers: [
        {
          user: 'valid_user',
          isRegistered: true,
          bonifications: [],
          penalties: []
        }
      ],
      scoringSystem: new Types.ObjectId() as any,
      admins: [{ user: 'valid_user', isCreator: true }],
      teamStandings: new Types.ObjectId() as any,
      driverStandings: new Types.ObjectId() as any
    }

    await ChampionshipModel.create({ _id: dto.id, ...dto })

    const result = await sut.getOne({ id: dto.id as any })

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

  it('should call ChampionshipModel findById method with correct values', async () => {
    const sut = makeSut()

    const getOneChampionshipSpy = jest.spyOn(ChampionshipModel, 'findById')

    const dto = {
      id: new Types.ObjectId(),
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [new Types.ObjectId() as any],
      teams: [new Types.ObjectId() as any],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: new Types.ObjectId() as any,
      admins: [{ user: 'valid_user', isCreator: true }],
      teamStandings: new Types.ObjectId() as any,
      driverStandings: new Types.ObjectId() as any
    }

    await ChampionshipModel.create({ _id: dto.id, ...dto })

    await sut.getOne({ id: dto.id as any })

    expect(getOneChampionshipSpy).toHaveBeenCalledWith(dto.id)
  })
})
