import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dtos'
import User from '../../entities/user.entity'
import { S3RepositoryAbstract } from '../../repositories/s3/s3.repository'
import { UserRepositoryAbstract } from '../../repositories/user/user.repository'

export interface UserServiceAbstract {
  login(email: string, password: string): Promise<{ token: string }>
  create(createUserDto: CreateUserDto): Promise<User>
  getOne({
    id,
    userName
  }: {
    id?: string
    userName?: string
  }): Promise<User | null>
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>
  getAll({ userName }: { userName?: string }): Promise<User[]>
}

export class UserService implements UserServiceAbstract {
  constructor(
    private readonly userRepository: UserRepositoryAbstract,
    private readonly userFirebaseRepository: UserRepositoryAbstract,
    private readonly s3Repository: S3RepositoryAbstract
  ) {}

  login(email: string, password: string): Promise<{ token: string }> {
    return this.userFirebaseRepository.login(email, password)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.profileImage || createUserDto.profileImageUrl) {
      return await this.userRepository.create(createUserDto)
    }

    const profileImageUrl = await this.s3Repository.uploadImage({
      folderName: 'profile-images',
      fileName: createUserDto.id,
      file: createUserDto.profileImage
    })

    return await this.userRepository.create({
      ...createUserDto,
      profileImageUrl: profileImageUrl
    })
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
    if (!updateUserDto.profileImage) {
      return await this.userRepository.update(id, updateUserDto)
    }

    const profileImageUrl = await this.s3Repository.uploadImage({
      folderName: 'profile-images',
      fileName: id,
      file: updateUserDto.profileImage
    })

    return await this.userRepository.update(id, {
      ...updateUserDto,
      profileImageUrl
    })
  }

  async getAll({
    userName
  }: {
    userName?: string | undefined
  }): Promise<User[]> {
    return await this.userRepository.getAll({ userName })
  }
}
