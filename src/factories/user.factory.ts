import { UserController } from '../controllers/user/user.controller'
import UserModel from '../models/user.model'
import { MongoUserRepository } from '../repositories/user/user.repository'
import { UserService } from '../services/user/user.service'

const makeUserController = (): UserController => {
  const userRepository = new MongoUserRepository(UserModel)
  const userService = new UserService(userRepository)

  const userController = new UserController(userService)

  return userController
}

export default makeUserController
