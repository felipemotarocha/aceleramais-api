import request from 'supertest'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'

import app from '../config/app.config'

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
        races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
        scoringSystem: { 1: 25, 2: 20 },
        teamStandings: 'valid_team_standings',
        driverStandings: 'valid_driver_standings'
      })
      .expect(200)
  })
})
