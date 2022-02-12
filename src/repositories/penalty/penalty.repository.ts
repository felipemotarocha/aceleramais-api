import { CreatePenaltyDto, UpdatePenaltyDto } from '../../dtos/penalty.dtos'
import Penalty from '../../entities/penalty.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import PenaltyModel from '../../models/penalty.model'

export interface PenaltyRepositoryAbstract {
  getAll({ championship }: { championship: string }): Promise<Penalty[]>
  create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty>
  update(id: string, updatePenaltyDto: UpdatePenaltyDto): Promise<Penalty>
  delete(id: string): Promise<Penalty>
}

export class MongoPenaltyRepository implements PenaltyRepositoryAbstract {
  private readonly penaltyModel: typeof PenaltyModel

  constructor(penaltyModel: typeof PenaltyModel) {
    this.penaltyModel = penaltyModel
  }

  async getAll({ championship }: { championship: string }): Promise<Penalty[]> {
    const penalties = await this.penaltyModel.find({ championship })

    return penalties.map((penalty) =>
      MongooseHelper.map<Penalty>(penalty.toJSON())
    )
  }

  async create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty> {
    const penalty = await this.penaltyModel.create(createPenaltyDto)

    return MongooseHelper.map<Penalty>(penalty.toJSON())
  }

  async update(
    id: string,
    updatePenaltyDto: UpdatePenaltyDto
  ): Promise<Penalty> {
    const penalty = await this.penaltyModel.findByIdAndUpdate(
      id,
      updatePenaltyDto,
      { new: true }
    )

    return MongooseHelper.map<Penalty>(penalty.toJSON())
  }

  async delete(id: string): Promise<Penalty> {
    const penalty = await this.penaltyModel.findByIdAndDelete(id, {
      new: true
    })

    return MongooseHelper.map<Penalty>(penalty.toJSON())
  }
}
