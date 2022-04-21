import { Types } from 'mongoose'

import { env } from '../../config/env.config'
import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import MongooseHelper from '../../helpers/mongoose.helpers'
import RaceClassificationModel from '../../models/race-classification.model'
import RaceModel from '../../models/race.model'
import TeamModel from '../../models/team.model'
import UserModel from '../../models/user.model'
import { MongoRaceClassificationRepository } from './race-classification.repository'

describe('Mongo Race Classification Repository', () => {
  const validRaceClassification: CreateRaceClassificationDto = {
    race: new Types.ObjectId() as any,
    classification: [
      {
        position: 1,
        user: 'valid_user',
        team: new Types.ObjectId() as any,
        isRegistered: true,
        isRemoved: false,
        hasFastestLap: true,
        hasPolePosition: true,
        scores: true
      }
    ]
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await RaceModel.deleteMany({})
    await RaceClassificationModel.deleteMany({})
    await TeamModel.deleteMany({})
    await UserModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () =>
    new MongoRaceClassificationRepository(RaceClassificationModel)

  it('should create a Race Classification', async () => {
    const sut = makeSut()

    const result = await sut.create(validRaceClassification as any)

    expect(result.classification[0].position).toBe(
      validRaceClassification.classification[0].position
    )
    expect(result.classification[0].user).toBe(
      validRaceClassification.classification[0].user
    )
    expect(result.classification[0].team).toStrictEqual(
      validRaceClassification.classification[0].team
    )
    expect(result.classification[0].isRegistered).toBe(
      validRaceClassification.classification[0].isRegistered
    )
    expect(result.classification[0].hasFastestLap).toBe(
      validRaceClassification.classification[0].hasFastestLap
    )
    expect(result.classification[0].hasPolePosition).toBe(
      validRaceClassification.classification[0].hasPolePosition
    )
  })

  it('should get a Race Classification by Race', async () => {
    const sut = makeSut()

    await RaceClassificationModel.create(validRaceClassification)

    const result = await sut.getOne(validRaceClassification.race)

    expect(result.classification[0].position).toBe(
      validRaceClassification.classification[0].position
    )
    expect(result.classification[0].user).toBe(null)
    expect(result.classification[0].team).toStrictEqual(null)
    expect(result.classification[0].isRegistered).toBe(
      validRaceClassification.classification[0].isRegistered
    )
    expect(result.classification[0].hasFastestLap).toBe(
      validRaceClassification.classification[0].hasFastestLap
    )
    expect(result.classification[0].hasPolePosition).toBe(
      validRaceClassification.classification[0].hasPolePosition
    )
  })

  it('should get all Race Classifications by Races', async () => {
    const sut = makeSut()

    await RaceClassificationModel.create(validRaceClassification)

    const result = await sut.getAll([validRaceClassification.race])

    expect(result[0].classification[0].position).toBe(
      validRaceClassification.classification[0].position
    )
    expect(result[0].classification[0].user).toBe(null)
    expect(result[0].classification[0].team).toStrictEqual(null)
    expect(result[0].classification[0].isRegistered).toBe(
      validRaceClassification.classification[0].isRegistered
    )
    expect(result[0].classification[0].hasFastestLap).toBe(
      validRaceClassification.classification[0].hasFastestLap
    )
    expect(result[0].classification[0].hasPolePosition).toBe(
      validRaceClassification.classification[0].hasPolePosition
    )
  })

  it('should update a Race Classification', async () => {
    const sut = makeSut()

    const raceClassification = await sut.create(validRaceClassification as any)

    const dto: UpdateRaceClassificationDto = {
      classification: [
        {
          position: 2,
          user: 'valid_user',
          team: new Types.ObjectId() as any,
          isRegistered: true,
          isRemoved: false,
          hasFastestLap: false,
          hasPolePosition: false,
          scores: true
        }
      ]
    }

    const result = await sut.update(raceClassification.id, dto)

    expect(result.classification[0].position).toBe(
      dto.classification[0].position
    )
    expect(result.classification[0].user).toBe('valid_user')
    expect(result.classification[0].team).toStrictEqual(
      dto.classification[0].team
    )
    expect(result.classification[0].isRegistered).toBe(
      dto.classification[0].isRegistered
    )
    expect(result.classification[0].hasFastestLap).toBe(
      dto.classification[0].hasFastestLap
    )
    expect(result.classification[0].hasPolePosition).toBe(
      dto.classification[0].hasPolePosition
    )
  })

  it('should bulk delete Race Classifications', async () => {
    const sut = makeSut()

    const raceClassification = await sut.create(validRaceClassification as any)

    const result = await sut.bulkDelete([raceClassification.id])

    expect(result).toBe(1)
  })
})
