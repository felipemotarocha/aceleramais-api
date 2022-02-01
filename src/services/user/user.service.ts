import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dtos'
import User from '../../entities/user.entity'
import { UserRepositoryAbstract } from '../../repositories/user/user.repository'

export interface UserServiceAbstract {
  create(createUserDto: CreateUserDto): Promise<User>
  getOne({
    id,
    userName
  }: {
    id?: string
    userName?: string
  }): Promise<User | null>
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

  async getOne({
    id,
    userName
  }: {
    id?: string
    userName?: string
  }): Promise<User | null> {
    return await this.userRepository.getOne({ id, userName })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, updateUserDto)
  }
}
