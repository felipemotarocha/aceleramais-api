import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _RaceClassificationModel from '../../models/race-classification.model'
import { BaseRepositoryParams } from '../base.repository'

export interface RaceClassificationRepositoryAbstract {
  create(
    params: BaseRepositoryParams & { dto: CreateRaceClassificationDto }
  ): Promise<RaceClassification>
  getOne(race: string): Promise<RaceClassification>
  getAll(races: string[]): Promise<RaceClassification[]>
  update(
    id: string,
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassification>
  bulkDelete(params: BaseRepositoryParams & { ids: string[] }): Promise<number>
}

export class MongoRaceClassificationRepository
implements RaceClassificationRepositoryAbstract {
  private readonly RaceClassificationModel: typeof _RaceClassificationModel

  constructor(RaceClassificationModel: typeof _RaceClassificationModel) {
    this.RaceClassificationModel = RaceClassificationModel
  }

  async create(
    params: BaseRepositoryParams & { dto: CreateRaceClassificationDto }
  ): Promise<RaceClassification> {
    const raceClassification = await this.RaceClassificationModel.create(
      [params.dto],
      { session: params?.session }
    )

    const classification = raceClassification[0].classification.map((item) =>
      item.toJSON()
    )

    return {
      ...MongooseHelper.map<RaceClassification>(raceClassification[0].toJSON()),
      classification
    }
  }

  async getOne(race: string): Promise<RaceClassification> {
    const raceClassification = await this.RaceClassificationModel.findOne({
      race
    })

    const classification = raceClassification.classification.map((item) =>
      item.toJSON()
    )

    return {
      ...MongooseHelper.map<RaceClassification>(raceClassification.toJSON()),
      classification
    }
  }

  async getAll(races: string[]): Promise<RaceClassification[]> {
    const raceClassifications = await this.RaceClassificationModel.find({
      race: { $in: races }
    })

    return raceClassifications.map((item) =>
      MongooseHelper.map<RaceClassification>(item.toJSON())
    )
  }

  async update(
    id: string,
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassification> {
    const raceClassification = await this.RaceClassificationModel.findById(id)

    raceClassification.classification =
      updateRaceClassificationDto.classification

    await raceClassification.save()

    const classification = raceClassification.classification.map((item) =>
      item.toJSON()
    )

    return {
      ...MongooseHelper.map<RaceClassification>(raceClassification.toJSON()),
      classification
    }
  }

  async bulkDelete(
    params: BaseRepositoryParams & { ids: string[] }
  ): Promise<number> {
    const { deletedCount } = await this.RaceClassificationModel.deleteMany(
      {
        _id: params.ids
      },
      { session: params.session }
    )

    return deletedCount
  }
}
