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

  it('should return a Championship on creation success', async () => {
    const data = {
      code: 'valid_code',
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: new Types.ObjectId() }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [
        { user: new Types.ObjectId(), isRegistered: true, isRemoved: false }
      ],
      pendentDrivers: [],
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

  it('should update a Championship', async () => {
    const data = {
      code: 'valid_code',
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: new Types.ObjectId() }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [
        { user: new Types.ObjectId(), isRegistered: true, isRemoved: false }
      ],
      pendentDrivers: [],
      bonifications: [{ name: 'valid_bonifcation', points: 1 }],
      penalties: [{ name: 'valid_penalty', points: 1 }],
      scoringSystem: { 1: 25, 2: 20 },
      admins: [{ user: new Types.ObjectId(), isCreator: true }]
    }

    const { body } = await request(app)
      .post('/api/championship')
      .accept('application/json')
      .field('data', JSON.stringify(data))
      .expect(201)

    await request(app)
      .put(`/api/championship/${body.id}`)
      .accept('application/json')
      .field(
        'data',
        JSON.stringify({
          name: 'PSGL Sim Racing League',
          teams: [
            {
              id: 'fe91f099-c73c-4f4d-b010-7ef9e5d246ed',
              color: '#03BFB5',
              name: 'Mercedes'
            }
          ],
          drivers: [
            {
              id: '3386e902-27d1-4738-944a-3385174d53c4',
              firstName: 'Max',
              lastName: 'Verstappen',
              team: 'fe91f099-c73c-4f4d-b010-7ef9e5d246ed',
              isRegistered: false
            }
          ],
          pendentDrivers: [],
          races: [
            {
              startDate: '2022-02-19T19:51:04.029Z',
              track: '624ef8a7a48d056271814be5',
              id: '625788ed6db7b7be52a643b9'
            },
            {
              startDate: '2022-02-19T19:51:04.029Z',
              track: '624ef8a7a48d056271814be6'
            }
          ],
          scoringSystem: { 1: 25 },
          penalties: [],
          bonifications: []
        })
      )
      .expect(200)
  })

  it('should get a Championship by ID', async () => {
    const data = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: new Types.ObjectId() }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [
        { user: new Types.ObjectId(), isRegistered: true, isRemoved: false }
      ],
      pendentDrivers: [],
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

  it('should get Championships by Driver', async () => {
    const data = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: new Types.ObjectId() }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [
        { user: new Types.ObjectId(), isRegistered: true, isRemoved: false }
      ],
      pendentDrivers: [],
      bonifications: [{ name: 'valid_bonifcation', points: 1 }],
      penalties: [{ name: 'valid_penalty', points: 1 }],
      scoringSystem: { 1: 25, 2: 20 },
      admins: [{ user: new Types.ObjectId(), isCreator: true }]
    }

    await request(app)
      .post('/api/championship')
      .set('Content-type', 'multipart/form-data')
      .field('data', JSON.stringify(data))

    await request(app)
      .get(`/api/championship?driver=${data.drivers[0].user}`)
      .expect(200)
  })
})
