import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dtos'
import User from '../../entities/user.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import UserModel from '../../models/user.model'

export interface UserRepositoryAbstract {
  create(createUserDto: CreateUserDto): Promise<User>
  getOne(id: string): Promise<User>
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>
}

export class MongoUserRepository implements UserRepositoryAbstract {
  private readonly userModel: typeof UserModel

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create({
      _id: createUserDto.id,
      ...createUserDto
    })

    return MongooseHelper.map<User>(user.toJSON())
  }

  async getOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id })

    return MongooseHelper.map<User>(user.toJSON())
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true }
    )

    return MongooseHelper.map<User>(user.toJSON())
  }
}
