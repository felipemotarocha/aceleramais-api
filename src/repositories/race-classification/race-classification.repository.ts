import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassfication from '../../entities/race-classification.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _RaceClassificationModel from '../../models/race-classification.model'

export interface RaceClassificationRepositoryAbstract {
  create(
    createRaceClassificationDto: CreateRaceClassificationDto
  ): Promise<RaceClassfication>
  getOne(race: string): Promise<RaceClassfication>
  update(
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassfication>
}

export class MongoRaceClassificationRepository
implements RaceClassificationRepositoryAbstract {
  private readonly RaceClassificationModel: typeof _RaceClassificationModel

  constructor(RaceClassificationModel: typeof _RaceClassificationModel) {
    this.RaceClassificationModel = RaceClassificationModel
  }

  async create(
    createRaceClassificationDto: CreateRaceClassificationDto
  ): Promise<RaceClassfication> {
    const raceClassification = await this.RaceClassificationModel.create(
      createRaceClassificationDto
    )

    const classification = raceClassification.classification.map((item) =>
      item.toJSON()
    )

    return {
      ...MongooseHelper.map<RaceClassfication>(raceClassification.toJSON()),
      classification
    }
  }

  getOne(race: string): Promise<RaceClassfication> {
    throw new Error('Method not implemented.')
  }

  update(
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassfication> {
    throw new Error('Method not implemented.')
  }
}
