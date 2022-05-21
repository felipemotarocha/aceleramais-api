import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import BonificationModel from '../../models/bonification.model'

describe('Bonification Routes', () => {
  const validBonification = {
    name: 'valid_bonification',
    points: 1,
    championship: new Types.ObjectId()
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await BonificationModel.deleteMany({})

    await BonificationModel.create(validBonification)
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should get all Bonifications by Championship', async () => {
    await request(app)
      .get(`/api/bonification?championship=${validBonification.championship}`)
      .set('authorization', 'Bearer valid_token')
      .expect(200)
  })
})
