import { Types } from 'mongoose'

import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TrackModel from '../../models/track.model'
import MongoTrackRepository from './track.repository'

describe('Mongo Track Repository', () => {
  const validTrack = {
    id: new Types.ObjectId(),
    countryCode: 'BR',
    name: 'Autódromo José Carlos Pace',
    countryName: 'Brasil'
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await TrackModel.deleteMany({})

    await TrackModel.create({
      _id: validTrack.id,
      name: validTrack.name,
      countryCode: validTrack.countryCode,
      countryName: 'Brasil'
    })
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoTrackRepository(TrackModel)

  it('should get all the Tracks', async () => {
    const sut = makeSut()

    const result = await sut.getAll()

    expect(result[0].id).toStrictEqual(validTrack.id)
    expect(result[0].name).toBe(validTrack.name)
    expect(result[0].countryCode).toBe(validTrack.countryCode)
    expect(result[0].countryName).toBe(validTrack.countryName)
  })
})
