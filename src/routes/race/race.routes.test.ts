import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import RaceClassificationModel from '../../models/race-classification.model'
import RaceModel from '../../models/race.model'
import TrackModel from '../../models/track.model'

describe('Race Routes', () => {
  const validTrack = {
    id: new Types.ObjectId(),
    countryCode: 'BR',
    name: 'Autódromo José Carlos Pace'
  }

  const validRace = {
    id: new Types.ObjectId(),
    championship: new Types.ObjectId(),
    classification: new Types.ObjectId(),
    track: validTrack.id,
    startDate: 'valid_start_date'
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await RaceModel.deleteMany({})
    await RaceClassificationModel.deleteMany({})

    await TrackModel.create({
      _id: validTrack.id,
      name: validTrack.name,
      countryCode: validTrack.countryCode,
      countryName: 'Brasil'
    })

    await RaceModel.create({ ...validRace })
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should get a Race by Championship ID', async () => {
    await request(app)
      .get(`/api/race?championship=${validRace.championship}`)
      .set('authorization', 'Bearer valid_token')
      .expect(200)
  })
})
