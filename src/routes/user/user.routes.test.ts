import request from 'supertest'
import app from '../../config/app.config'
import { env } from '../../config/env.config'
import MongooseHelper from '../../helpers/mongoose.helpers'
import UserModel from '../../models/user.model'

describe('User Routes', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  it('should return an User on success', async () => {
    await request(app)
      .post('/api/user')
      .send({
        id: 'valid_id',
        email: 'valid_email',
        firstName: 'valid_first_name',
        lastName: 'valid_last_name',
        provider: 'valid_provider',
        userName: 'valid_user_name'
      })
      .expect(201)
  })

  it('should get an User by ID', async () => {
    const { body } = await request(app).post('/api/user').send({
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    })

    await request(app).get(`/api/user?id=${body.id}`).expect(200)
  })

  it('should get an User by userName', async () => {
    const { body } = await request(app).post('/api/user').send({
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    })

    await request(app).get(`/api/user?userName=${body.userName}`).expect(200)
  })

  it('should update an User', async () => {
    const { body } = await request(app).post('/api/user').send({
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    })

    await request(app)
      .patch(`/api/user/${body.id}`)
      .send({
        firstName: 'new_first_name'
      })
      .expect(200)
  })
})
