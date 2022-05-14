/* eslint-disable no-useless-constructor */
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserMongoDto
} from '../../dtos/user.dtos'
import User from '../../entities/user.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import DriverStandingsModel from '../../models/driver-standings.model'
import RaceClassificationModel from '../../models/race-classification.model'
import UserModel from '../../models/user.model'

export interface UserRepositoryAbstract {
  create(createUserDto: CreateUserDto): Promise<User>
  getOne({
    id,
    userName
  }: {
    id?: string
    userName?: string
  }): Promise<User | null>
  update(id: string, updateUserDto: UpdateUserMongoDto): Promise<User>
  getAll({ userName }: { userName?: string }): Promise<User[]>
}

export class MongoUserRepository implements UserRepositoryAbstract {
  constructor(
    private readonly userModel: typeof UserModel,
    private readonly driverStandingsModel: typeof DriverStandingsModel,
    private readonly raceClassificationModel: typeof RaceClassificationModel
  ) {}

  async getWins(user: User) {
    return await this.raceClassificationModel
      .find({
        classification: {
          $elemMatch: { user: user.id, position: 1 }
        },
        $expr: { $gte: [{ $size: '$classification' }, 3] }
      })
      .count()
  }

  async getPodiums(user: User) {
    return await this.raceClassificationModel
      .find({
        classification: {
          $elemMatch: { user: user.id, position: { $in: [1, 2, 3] } }
        },
        $expr: { $gte: [{ $size: '$classification' }, 3] }
      })
      .count()
  }

  async getTitles(user: User) {
    const result = await this.driverStandingsModel
      .aggregate([
        {
          $lookup: {
            from: 'championships',
            localField: '_id',
            foreignField: 'driverStandings',
            as: 'standingsChampionship'
          }
        },
        { $unwind: '$standingsChampionship' },
        {
          $project: {
            'standingsChampionship.drivers': 1,
            'standingsChampionship.races': 1,
            standings: 1
          }
        },
        {
          $match: {
            $expr: { $gte: [{ $size: '$standingsChampionship.drivers' }, 3] }
          }
        },
        {
          $lookup: {
            from: 'races',
            localField: 'standingsChampionship.races',
            foreignField: '_id',
            as: 'championshipRaces'
          }
        },
        {
          $match: {
            'championshipRaces.isCompleted': { $ne: false }
          }
        },
        {
          $match: {
            standings: { $elemMatch: { user: user.id, position: 1 } }
          }
        }
      ])
      .count('titles')

    return result?.[0]?.titles || 0
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create({
      _id: createUserDto.id,
      ...createUserDto
    })

    return MongooseHelper.map<User>(user.toJSON())
  }

  async getOne({
    id,
    userName
  }: {
    id?: string
    userName?: string
  }): Promise<User | null> {
    let user: any

    if (id) {
      user = await this.userModel.findOne({ _id: id })
    }

    if (userName) {
      user = await this.userModel.findOne({ userName })
    }

    if (!user) return null

    const wins = await this.getWins(user)
    const podiums = await this.getPodiums(user)
    const titles = await this.getTitles(user)

    return MongooseHelper.map<User>({ ...user.toJSON(), wins, podiums, titles })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true }
    )

    return MongooseHelper.map<User>(user.toJSON())
  }

  async getAll({
    userName
  }: {
    userName?: string | undefined
  }): Promise<User[]> {
    const users = await this.userModel
      .find({
        userName: { $regex: `^${userName}` }
      })
      .sort({ userName: 1 })

    return users.map((user) => MongooseHelper.map<User>(user.toJSON()))
  }
}
