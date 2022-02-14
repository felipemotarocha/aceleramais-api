import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'

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
    const data = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: new Types.ObjectId() }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: new Types.ObjectId(), isRegistered: true }],
      bonifications: [{ name: 'valid_bonifcation', points: 1 }],
      penalties: [{ name: 'valid_penalty', points: 1 }],
      scoringSystem: { 1: 25, 2: 20 },
      admins: [{ user: new Types.ObjectId(), isCreator: true }]
    }

    await request(app)
      .post('/api/championship')
      .accept('application/json')
      .field('data', JSON.stringify(data))
      .expect(201)
  })

  it('should get a Championship by ID', async () => {
    const data = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: new Types.ObjectId() }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: new Types.ObjectId(), isRegistered: true }],
      bonifications: [{ name: 'valid_bonifcation', points: 1 }],
      penalties: [{ name: 'valid_penalty', points: 1 }],
      scoringSystem: { 1: 25, 2: 20 },
      admins: [{ user: new Types.ObjectId(), isCreator: true }]
    }

    const { body } = await request(app)
      .post('/api/championship')
      .set('Content-type', 'multipart/form-data')
      .field('data', JSON.stringify(data))

    await request(app).get(`/api/championship/${body.id}`).expect(200)
  })
})
