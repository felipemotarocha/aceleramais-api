import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TeamStandingsModel from '../../models/team-standings.model'
import TeamModel from '../../models/team.model'

describe('Team Standings Routes', () => {
  const validTeam = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    name: 'Mercedes',
    color: '#fff'
  }

  const validTeamStandings = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    standings: [
      {
        team: validTeam.id,
        position: 1,
        points: 10
      }
    ]
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await TeamModel.deleteMany({})

    await TeamModel.create({
      _id: validTeam.id,
      ...validTeam
    })

    await TeamStandingsModel.create({
      _id: validTeamStandings.id,
      ...validTeamStandings
    })
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should get a Team Standings by Championship', async () => {
    await request(app)
      .get(`/api/teamStandings?championship=${validTeamStandings.championship}`)
      .expect(200)
  })
})
