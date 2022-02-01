import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dtos'
import User from '../../entities/user.entity'
import { UserRepositoryAbstract } from '../../repositories/user/user.repository'
import { UserServiceAbstract, UserService } from './user.service'

describe('User Service', () => {
  const validUser: User = {
    id: 'valid_id',
    email: 'valid_email',
    firstName: 'valid_first_name',
    lastName: 'valid_last_name',
    provider: 'valid_provider',
    userName: 'valid_user_name'
  }

  interface SutTypes {
    userRepositoryStub: UserRepositoryAbstract
    sut: UserServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class UserRepositoryStub implements UserRepositoryAbstract {
      async create(): Promise<User> {
        return validUser
      }

      async getOne(): Promise<User> {
        return validUser
      }

      async update(): Promise<User> {
        return validUser
      }
    }

    const userRepositoryStub = new UserRepositoryStub()
    const sut = new UserService(userRepositoryStub)

    return { userRepositoryStub, sut }
  }

  it('should create an User', async () => {
    const { sut } = makeSut()

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validUser)
  })

  it('should call UserRepository create method with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()

    const createUserSpy = jest.spyOn(userRepositoryStub, 'create')

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await sut.create(dto)

    expect(createUserSpy).toHaveBeenCalledWith(dto)
  })

  it('should throws if UserRepository create method throws', async () => {
    const { sut, userRepositoryStub } = makeSut()

    jest
      .spyOn(userRepositoryStub, 'create')
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

    const promise = sut.create(dto)

    expect(promise).rejects.toThrow()
  })

  it('should get an User by ID', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ id: 'valid_id' })

    expect(result).toStrictEqual(validUser)
  })

  it('should get an User by userName', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ userName: 'valid_user_name' })

    expect(result).toStrictEqual(validUser)
  })

  it('should call UserRepository getOne method with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()

    const getOneUserSpy = jest.spyOn(userRepositoryStub, 'getOne')

    await sut.getOne({ id: 'valid_id', userName: undefined })

    expect(getOneUserSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      userName: undefined
    })
  })

  it('should throws if UserRepository getOne method throws', async () => {
    const { sut, userRepositoryStub } = makeSut()

    jest
      .spyOn(userRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getOne({ id: 'valid_id' })

    expect(promise).rejects.toThrow()
  })

  it('should Update an User', async () => {
    const { sut } = makeSut()

    const dto: UpdateUserDto = {
      firstName: 'new_first_name'
    }

    const result = await sut.update('valid_id', dto)

    expect(result).toStrictEqual(validUser)
  })

  it('should call UserRepository update method with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()

    const updateUserSpy = jest.spyOn(userRepositoryStub, 'update')

    const dto: UpdateUserDto = {
      firstName: 'new_first_name'
    }

    await sut.update('valid_id', dto)

    expect(updateUserSpy).toHaveBeenCalledWith('valid_id', dto)
  })

  it('should throws if UserRepository update method throws', async () => {
    const { sut, userRepositoryStub } = makeSut()

    jest
      .spyOn(userRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto: UpdateUserDto = {
      firstName: 'new_first_name'
    }

    const promise = sut.update('valid_id', dto)

    expect(promise).rejects.toThrow()
  })
})
