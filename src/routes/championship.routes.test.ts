import { Types } from 'mongoose'
import request from 'supertest'
import app from '../config/app.config'
import { env } from '../config/env.config'
import MongooseHelper from '../helpers/mongoose.helpers'
import ChampionshipModel from '../models/championship.model'

describe('Championship Routes', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await ChampionshipModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should return a Championship on success', async () => {
    await request(app)
      .post('/api/championship')
      .send({
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ startDate: 'valid_start_date', track: new Types.ObjectId() }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: new Types.ObjectId(), isRegistered: true }],
        scoringSystem: { 1: 25, 2: 20 }
      })
      .expect(201)
  })
})
