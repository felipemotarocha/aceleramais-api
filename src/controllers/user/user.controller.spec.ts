import { CreateUserDto } from '../../dtos/user.dtos'
import User from '../../entities/user.entity'
import { MissingParamError, ServerError } from '../../errors/controllers.errors'
import { UserServiceAbstract } from '../../services/user/user.service'
import { UserController, UserControllerAbstract } from './user.controller'

describe('User Controller', () => {
  const validUser: User = {
    id: 'valid_id',
    email: 'valid_email',
    firstName: 'valid_first_name',
    lastName: 'valid_last_name',
    provider: 'valid_provider',
    userName: 'valid_user_name'
  }

  interface SutTypes {
    userServiceStub: UserServiceAbstract
    sut: UserControllerAbstract
  }

  const makeSut = (): SutTypes => {
    class UserServiceStub implements UserServiceAbstract {
      async create(createUserDto: CreateUserDto): Promise<User> {
        return validUser
      }

      async getOne(): Promise<User> {
        return validUser
      }

      async update(): Promise<User> {
        return validUser
      }
    }

    const userServiceStub = new UserServiceStub()
    const sut = new UserController(userServiceStub)

    return { sut, userServiceStub }
  }

  it('should return 201 on creation success', async () => {
    const { sut } = makeSut()

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validUser)
  })

  it('should call UserService create method with correct values', async () => {
    const { sut, userServiceStub } = makeSut()

    const createUserSpy = jest.spyOn(userServiceStub, 'create')

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await sut.create({ body: dto })

    expect(createUserSpy).toHaveBeenCalledWith(dto)
  })

  it('should return 400 if no firstName is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      id: 'valid_id',
      email: 'valid_email',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('firstName'))
  })

  it('should return 400 if no lastName is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('lastName'))
  })

  it('should return 400 if no id is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('id'))
  })

  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      id: 'valid_id',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('email'))
  })

  it('should return 400 if no provider is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      id: 'valid_id',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      email: 'valid_email',
      userName: 'valid_user_name'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('provider'))
  })

  it('should return 400 if UserService create method throws', async () => {
    const { sut, userServiceStub } = makeSut()

    jest
      .spyOn(userServiceStub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })
})