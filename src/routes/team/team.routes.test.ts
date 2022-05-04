import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TeamModel from '../../models/team.model'

describe('Team Routes', () => {
  const validTeam = {
    name: 'valid_team',
    color: 'valid_color',
    championship: new Types.ObjectId()
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await TeamModel.deleteMany({})

    await TeamModel.create(validTeam)
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should get all Teams by Championship', async () => {
    await request(app)
      .get(`/api/team?championship=${validTeam.championship}`)
      .expect(200)
  })
})
