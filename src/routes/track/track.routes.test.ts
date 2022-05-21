import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TrackModel from '../../models/championship.model'

describe('Track Routes', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await TrackModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should return all Tracks on success', async () => {
    await request(app)
      .get('/api/track')
      .set('authorization', 'Bearer valid_token')
      .expect(200)
  })
})
