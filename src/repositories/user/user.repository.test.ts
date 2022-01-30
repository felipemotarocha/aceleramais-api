import { env } from '../../config/env.config'
import { CreateUserDto } from '../../dtos/user.dtos'
import MongooseHelper from '../../helpers/mongoose.helpers'
import UserModel from '../../models/user.model'
import { MongoUserRepository } from './user.repository'

describe('User Repository', () => {
  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoUserRepository(UserModel)

  it('should create an User', async () => {
    const sut = makeSut()

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create(dto)

    expect(result.id).toBe(dto.id)
    expect(result.email).toBe(dto.email)
    expect(result.firstName).toBe(dto.firstName)
    expect(result.lastName).toBe(dto.lastName)
    expect(result.provider).toBe(dto.provider)
    expect(result.userName).toBe(dto.userName)
  })

  it('should call UserModel create method with correct values', async () => {
    const sut = makeSut()

    const createUserSpy = jest.spyOn(UserModel, 'create')

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }
    await sut.create(dto)

    expect(createUserSpy).toHaveBeenCalledWith({ _id: dto.id, ...dto })
  })
})
