import {
  CreateBonificationDto,
  UpdateBonificationDto
} from '../../dtos/bonification.dtos'
import Bonification from '../../entities/bonification.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import BonificationModel from '../../models/bonification.model'

export interface BonificationRepositoryAbstract {
  getAll({ championship }: { championship: string }): Promise<Bonification>
  create(createBonificationDto: CreateBonificationDto): Promise<Bonification>
  update(updateBonificationDto: UpdateBonificationDto): Promise<Bonification>
  delete(id: string): Promise<Bonification>
}

export class MongoBonificationRepository
implements BonificationRepositoryAbstract {
  private readonly bonificationModel: typeof BonificationModel

  constructor(bonificationModel: typeof BonificationModel) {
    this.bonificationModel = bonificationModel
  }

  getAll({ championship }: { championship: string }): Promise<Bonification> {
    throw new Error('Method not implemented.')
  }

  async create(
    createBonificationDto: CreateBonificationDto
  ): Promise<Bonification> {
    const bonification = await this.bonificationModel.create(
      createBonificationDto
    )

    return MongooseHelper.map<Bonification>(bonification.toJSON())
  }

  update(updateBonificationDto: UpdateBonificationDto): Promise<Bonification> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<Bonification> {
    throw new Error('Method not implemented.')
  }
}
