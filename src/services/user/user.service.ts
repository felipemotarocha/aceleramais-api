import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dtos'
import User from '../../entities/user.entity'
import { UserRepositoryAbstract } from '../../repositories/user/user.repository'

export interface UserServiceAbstract {
  create(createUserDto: CreateUserDto): Promise<User>
  getOne(id: string): Promise<User>
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>
}

export class UserService implements UserServiceAbstract {
  private userRepository: UserRepositoryAbstract

  constructor(userRepository: UserRepositoryAbstract) {
    this.userRepository = userRepository
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto)
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepository.getOne(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, updateUserDto)
  }
}
