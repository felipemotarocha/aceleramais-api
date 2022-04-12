import { Types } from 'mongoose'
import { env } from '../../config/env.config'

import MongooseHelper from '../../helpers/mongoose.helpers'
import BonificationModel from '../../models/bonification.model'
import ChampionshipModel from '../../models/championship.model'
import DriverStandingsModel from '../../models/driver-standings.model'
import PenaltyModel from '../../models/penalty.model'
import RaceModel from '../../models/race.model'
import TeamStandingsModel from '../../models/team-standings.model'
import TeamModel from '../../models/team.model'
import UserModel from '../../models/user.model'
import { MongoChampionshipRepository } from './championship.repository'

describe('Mongo Driver Standings Repository', () => {
  const validDto = {
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

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await ChampionshipModel.deleteMany({})
    await RaceModel.deleteMany({})
    await DriverStandingsModel.deleteMany({})
    await TeamStandingsModel.deleteMany({})
    await UserModel.deleteMany({})
    await BonificationModel.deleteMany({})
    await PenaltyModel.deleteMany({})
    await TeamModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoChampionshipRepository(ChampionshipModel)

  it('should create a Championship', async () => {
    const sut = makeSut()

    const result = await sut.create(validDto)

    expect(result.id).toBeTruthy()
    expect(result.description).toStrictEqual(validDto.description)
    expect(result.name).toStrictEqual(validDto.name)
    expect(result.platform).toStrictEqual(validDto.platform)
    expect(result.avatarImageUrl).toStrictEqual(validDto.avatarImageUrl)
    expect(result.races).toStrictEqual(validDto.races)
    expect(result.teams).toStrictEqual(validDto.teams)
    expect(result.drivers).toStrictEqual(validDto.drivers)
    expect(result.scoringSystem).toStrictEqual(validDto.scoringSystem)
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

  it('should update a championship', async () => {
    const sut = makeSut()

    const championship = await sut.create(validDto)

    const bonifications: any[] = [new Types.ObjectId()]

    const result = await sut.update(championship.id, {
      bonifications,
      penalties: [],
      drivers: [],
      teams: []
    })

    expect(result.bonifications).toStrictEqual(bonifications)
    expect(result.penalties).toStrictEqual([])
    expect(result.drivers).toStrictEqual([])
    expect(result.teams).toStrictEqual([])
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
    expect(result.drivers).toStrictEqual([{ ...dto.drivers[0], user: null }])
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

  it('should get a Championship by Drivers', async () => {
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

    const result = await sut.getAll({ driver: dto.drivers[0].user })

    expect(result[0].id).toBeTruthy()
    expect(result[0].description).toStrictEqual(dto.description)
    expect(result[0].name).toStrictEqual(dto.name)
    expect(result[0].platform).toStrictEqual(dto.platform)
    expect(result[0].avatarImageUrl).toStrictEqual(dto.avatarImageUrl)
    expect(result[0].races).toStrictEqual(dto.races)
    expect(result[0].teams).toStrictEqual(dto.teams)
    expect(result[0].drivers).toStrictEqual([{ ...dto.drivers[0], user: null }])
    expect(result[0].scoringSystem).toStrictEqual(dto.scoringSystem)
  })

  it('should get a Championship by Admin', async () => {
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

    const result = await sut.getAll({ admin: dto.admins[0].user })

    expect(result[0].id).toBeTruthy()
    expect(result[0].description).toStrictEqual(dto.description)
    expect(result[0].name).toStrictEqual(dto.name)
    expect(result[0].platform).toStrictEqual(dto.platform)
    expect(result[0].avatarImageUrl).toStrictEqual(dto.avatarImageUrl)
    expect(result[0].races).toStrictEqual(dto.races)
    expect(result[0].teams).toStrictEqual(dto.teams)
    expect(result[0].drivers).toStrictEqual([{ ...dto.drivers[0], user: null }])
    expect(result[0].scoringSystem).toStrictEqual(dto.scoringSystem)
  })
})
