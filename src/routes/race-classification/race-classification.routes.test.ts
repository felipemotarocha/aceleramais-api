import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import RaceClassificationModel from '../../models/race-classification.model'
import RaceModel from '../../models/race.model'
import TrackModel from '../../models/track.model'

describe('Race Classification Routes', () => {
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
    await TrackModel.deleteMany({})

    await RaceModel.create({ ...validRace })

    await RaceClassificationModel.create({
      race: validRace.id,
      classification: [
        {
          position: 1,
          user: new Types.ObjectId(),
          team: new Types.ObjectId(),
          isRegistered: true,
          isRemoved: false,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    })
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should get a Race Classification by Race ID', async () => {
    await request(app)
      .get(`/api/raceClassification?race=${validRace.id}`)
      .expect(200)
  })
})
