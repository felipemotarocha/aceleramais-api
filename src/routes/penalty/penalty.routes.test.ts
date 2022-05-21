import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import PenaltyModel from '../../models/penalty.model'

describe('Penalty Routes', () => {
  const validPenalty = {
    name: 'valid_penalty',
    points: 1,
    championship: new Types.ObjectId()
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await PenaltyModel.deleteMany({})

    await PenaltyModel.create(validPenalty)
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should get all Penalties by Championship', async () => {
    await request(app)
      .get(`/api/penalty?championship=${validPenalty.championship}`)
      .set('authorization', 'Bearer valid_token')
      .expect(200)
  })
})
