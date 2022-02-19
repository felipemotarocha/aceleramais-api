import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import DriverStandingsModel from '../../models/driver-standings.model'
import UserModel from '../../models/user.model'

describe('Driver Standings Routes', () => {
  const validUser = {
    id: 'valid_id',
    email: 'valid_email',
    firstName: 'valid_first_name',
    lastName: 'valid_last_name',
    provider: 'valid_provider',
    userName: 'valid_user_name'
  }

  const validDriverStandings = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    standings: [
      {
        user: validUser.id,
        isRegistered: true,
        position: 1,
        points: 10
      }
    ]
  }
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await DriverStandingsModel.deleteMany({})

    await UserModel.create({
      _id: validUser.id,
      ...validUser
    })

    await DriverStandingsModel.create({
      _id: validDriverStandings.id,
      ...validDriverStandings
    })
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should get a Driver Standings by Championship', async () => {
    await request(app)
      .get(
        `/api/driverStandings?championship=${validDriverStandings.championship}`
      )
      .expect(200)
  })
})
