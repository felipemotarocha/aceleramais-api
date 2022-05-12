import { UserController } from '../controllers/user/user.controller'
import DriverStandingsModel from '../models/driver-standings.model'
import RaceClassificationModel from '../models/race-classification.model'
import UserModel from '../models/user.model'
import { S3Repository } from '../repositories/s3/s3.repository'
import { MongoUserRepository } from '../repositories/user/user.repository'
import { UserService } from '../services/user/user.service'

const makeUserController = (): UserController => {
  const userRepository = new MongoUserRepository(
    UserModel,
    DriverStandingsModel,
    RaceClassificationModel
  )
  const s3Repository = new S3Repository()

  const userService = new UserService(userRepository, s3Repository)

  const userController = new UserController(userService)

  return userController
}

export default makeUserController
