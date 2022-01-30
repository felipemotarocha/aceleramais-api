import { CreateUserDto } from '../../dtos/user.dtos'
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

  it('should call TeamRepository create method with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()

    const createTeamSpy = jest.spyOn(userRepositoryStub, 'create')

    const dto: CreateUserDto = {
      id: 'valid_id',
      email: 'valid_email',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      provider: 'valid_provider',
      userName: 'valid_user_name'
    }

    await sut.create(dto)

    expect(createTeamSpy).toHaveBeenCalledWith(dto)
  })

  it('should throws if TeamRepository create method throws', async () => {
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
})
