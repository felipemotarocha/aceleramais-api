import { UserController } from '../controllers/user/user.controller'
import UserModel from '../models/user.model'
import { S3Repository } from '../repositories/s3/s3.repository'
import { MongoUserRepository } from '../repositories/user/user.repository'
import { UserService } from '../services/user/user.service'

const makeUserController = (): UserController => {
  const userRepository = new MongoUserRepository(UserModel)
  const s3Repository = new S3Repository()

  const userService = new UserService(userRepository, s3Repository)

  const userController = new UserController(userService)

  return userController
}

export default makeUserController
