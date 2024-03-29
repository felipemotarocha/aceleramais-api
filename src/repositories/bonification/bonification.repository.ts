import { ClientSession } from 'mongoose'
import {
  CreateBonificationDto,
  UpdateBonificationDto
} from '../../dtos/bonification.dtos'
import Bonification from '../../entities/bonification.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import BonificationModel from '../../models/bonification.model'
import { BaseRepositoryParams } from '../base.repository'

export interface BonificationRepositoryAbstract {
  getAll({ championship }: { championship: string }): Promise<Bonification[]>
  create(createBonificationDto: CreateBonificationDto): Promise<Bonification>
  bulkCreate(
    params: BaseRepositoryParams & { dto: CreateBonificationDto[] }
  ): Promise<Bonification[]>
  update(
    id: string,
    updateBonificationDto: UpdateBonificationDto
  ): Promise<Bonification>
  delete(id: string): Promise<Bonification>
  bulkDelete(params: {
    ids: string[]
    session?: ClientSession
  }): Promise<number>
}

export class MongoBonificationRepository
implements BonificationRepositoryAbstract {
  private readonly bonificationModel: typeof BonificationModel

  constructor(bonificationModel: typeof BonificationModel) {
    this.bonificationModel = bonificationModel
  }

  async getAll({
    championship
  }: {
    championship: string
  }): Promise<Bonification[]> {
    const bonifications = await this.bonificationModel.find({ championship })

    return bonifications.map((bonification) =>
      MongooseHelper.map<Bonification>(bonification.toJSON())
    )
  }

  async create(
    createBonificationDto: CreateBonificationDto
  ): Promise<Bonification> {
    const bonification = await this.bonificationModel.create(
      createBonificationDto
    )

    return MongooseHelper.map<Bonification>(bonification.toJSON())
  }

  async bulkCreate(
    params: BaseRepositoryParams & { dto: CreateBonificationDto[] }
  ): Promise<Bonification[]> {
    const bonifications = await this.bonificationModel.create(params.dto, {
      session: params?.session
    })

    return bonifications.map((team) => MongooseHelper.map(team.toJSON()))
  }

  async update(
    id: string,
    updateBonificationDto: UpdateBonificationDto
  ): Promise<Bonification> {
    const bonification = await this.bonificationModel.findByIdAndUpdate(
      id,
      updateBonificationDto,
      { new: true }
    )

    return MongooseHelper.map<Bonification>(bonification.toJSON())
  }

  async delete(id: string): Promise<Bonification> {
    const bonification = await this.bonificationModel.findByIdAndDelete(id, {
      new: true
    })

    return MongooseHelper.map<Bonification>(bonification.toJSON())
  }

  async bulkDelete(params: {
    ids: string[]
    session?: ClientSession
  }): Promise<number> {
    const { deletedCount } = await this.bonificationModel.deleteMany(
      {
        _id: params.ids
      },
      { session: params?.session }
    )

    return deletedCount
  }
}
