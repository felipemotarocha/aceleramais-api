import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import {
  CreateDriverStandingsDto,
  UpdateDriverStandingsDto
} from '../../dtos/driver-standings.dto'
import MongooseHelper from '../../helpers/mongoose.helpers'
import DriverStandingsModel from '../../models/driver-standings.model'
import TeamModel from '../../models/team.model'
import UserModel from '../../models/user.model'
import { MongoDriverStandingsRepository } from './driver-standings.repository'

describe('Mongo Driver Standings Repository', () => {
  const validUser = {
    id: 'valid_id',
    email: 'valid_email',
    firstName: 'valid_first_name',
    lastName: 'valid_last_name',
    provider: 'valid_provider',
    userName: 'valid_user_name',
    wins: 0,
    podiums: 0,
    titles: 0
  }

  const validDriverStandings = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    standings: [
      {
        user: validUser.id,
        isRegistered: true,
        isRemoved: false,
        position: 1,
        points: 10
      }
    ]
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await DriverStandingsModel.deleteMany({})
    await UserModel.deleteMany({})
    await TeamModel.deleteMany({})

    await UserModel.create({ _id: validUser.id, ...validUser })
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoDriverStandingsRepository(DriverStandingsModel)

  it('should create a Scoring System', async () => {
    const sut = makeSut()

    const dto: CreateDriverStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          user: validUser.id,
          isRegistered: true,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    }

    const result = await sut.create({ dto })

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.standings[0].user).toStrictEqual(dto.standings[0].user)
    expect(result.standings[0].isRegistered).toBe(dto.standings[0].isRegistered)
    expect(result.standings[0].position).toBe(dto.standings[0].position)
  })

  it('should call DriverStandingsModel create method with correct values', async () => {
    const sut = makeSut()

    const createDriverStandingsSpy = jest.spyOn(DriverStandingsModel, 'create')

    const dto: CreateDriverStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          user: validUser.id,
          isRegistered: true,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    }

    await sut.create({ dto })

    expect(createDriverStandingsSpy).toHaveBeenCalledWith([dto], {
      session: undefined
    })
  })

  it('should get a Driver Standings by Championship', async () => {
    const sut = makeSut()

    await DriverStandingsModel.create({
      _id: validDriverStandings.id,
      ...validDriverStandings
    })

    const result = await sut.getOne({
      championship: validDriverStandings.championship as any
    })

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(validDriverStandings.championship)
    expect(result.standings[0].user).toStrictEqual({
      id: validUser.id,
      firstName: validUser.firstName,
      lastName: validUser.lastName,
      userName: validUser.userName,
      profileImageUrl: `https://${env.cloudFrontUrl}/user-avatars/default.png`
    })
    expect(result.standings[0].isRegistered).toBe(
      validDriverStandings.standings[0].isRegistered
    )
    expect(result.standings[0].position).toBe(
      validDriverStandings.standings[0].position
    )
  })

  it('should call DriverStandingsModel getOne method with correct values', async () => {
    const sut = makeSut()

    await DriverStandingsModel.create({
      _id: validDriverStandings.id,
      ...validDriverStandings
    })

    const getOneDriverStandingsSpy = jest.spyOn(DriverStandingsModel, 'findOne')

    await sut.getOne({
      championship: validDriverStandings.championship as any
    })

    expect(getOneDriverStandingsSpy).toHaveBeenCalledWith({
      championship: validDriverStandings.championship as any
    })
  })

  it('should update a Driver Standings', async () => {
    const sut = makeSut()

    await DriverStandingsModel.create([
      { _id: validDriverStandings.id, ...validDriverStandings }
    ])

    const dto: UpdateDriverStandingsDto = {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    }

    const result = await sut.update(validDriverStandings.id.toHexString(), dto)

    expect(result.id).toBeTruthy()
    expect(result.standings).toStrictEqual([
      {
        firstName: 'Max',
        lastName: 'Verstappen',
        isRegistered: false,
        isRemoved: false,
        position: 1,
        points: 10
      }
    ])
  })

  it('should call DriverStandingsModel findByIdAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateCollectionSpy = jest.spyOn(
      DriverStandingsModel,
      'findByIdAndUpdate'
    )

    await DriverStandingsModel.create([
      { _id: validDriverStandings.id, ...validDriverStandings }
    ])

    const dto: UpdateDriverStandingsDto = {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    }

    await sut.update(validDriverStandings.id.toHexString(), dto)

    expect(updateCollectionSpy).toHaveBeenCalledWith(
      validDriverStandings.id.toHexString(),
      dto,
      { new: true }
    )
  })
})
