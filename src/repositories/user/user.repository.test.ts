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

  it('should get an User by ID', async () => {
    const sut = makeSut()

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await UserModel.create({ _id: dto.id, ...dto })

    const result = await sut.getOne({ id: dto.id })

    expect(result!.id).toBe(dto.id)
    expect(result!.email).toBe(dto.email)
    expect(result!.firstName).toBe(dto.firstName)
    expect(result!.lastName).toBe(dto.lastName)
    expect(result!.provider).toBe(dto.provider)
    expect(result!.userName).toBe(dto.userName)
  })

  it('should get an User by userName', async () => {
    const sut = makeSut()

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await UserModel.create({ _id: dto.id, ...dto })

    const result = await sut.getOne({ userName: dto.userName })

    expect(result!.id).toBe(dto.id)
    expect(result!.email).toBe(dto.email)
    expect(result!.firstName).toBe(dto.firstName)
    expect(result!.lastName).toBe(dto.lastName)
    expect(result!.provider).toBe(dto.provider)
    expect(result!.userName).toBe(dto.userName)
  })

  it('should call UserModel findOne method with correct values', async () => {
    const sut = makeSut()

    const getOneUserSpy = jest.spyOn(UserModel, 'findOne')

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await UserModel.create({ _id: dto.id, ...dto })

    await sut.getOne({ id: dto.id })

    expect(getOneUserSpy).toHaveBeenCalledWith({ _id: dto.id })
  })

  it('should update an User', async () => {
    const sut = makeSut()

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await UserModel.create({ _id: dto.id, ...dto })

    const result = await sut.update(dto.id, {
      firstName: 'new_first_name'
    })

    expect(result.id).toBeTruthy()
    expect(result.email).toBe(dto.email)
    expect(result.firstName).toBe('new_first_name')
    expect(result.lastName).toBe(dto.lastName)
    expect(result.provider).toBe(dto.provider)
    expect(result.userName).toBe(dto.userName)
  })

  it('should call UserModel findOneAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateUserSpy = jest.spyOn(UserModel, 'findOneAndUpdate')

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await UserModel.create({ _id: dto.id, ...dto })

    await sut.update(dto.id, { firstName: 'new_first_name' })

    expect(updateUserSpy).toHaveBeenCalledWith(
      { _id: dto.id },
      { firstName: 'new_first_name' },
      {
        new: true
      }
    )
  })
})
