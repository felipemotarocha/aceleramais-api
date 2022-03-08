import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _RaceClassificationModel from '../../models/race-classification.model'

export interface RaceClassificationRepositoryAbstract {
  create(
    createRaceClassificationDto: CreateRaceClassificationDto
  ): Promise<RaceClassification>
  getOne(race: string): Promise<RaceClassification>
  getAll(races: string[]): Promise<RaceClassification[]>
  update(
    id: string,
    updateRaceClassificationDto: UpdateRaceClassificationDto
  ): Promise<RaceClassification>
}

export class MongoRaceClassificationRepository
implements RaceClassificationRepositoryAbstract {
  private readonly RaceClassificationModel: typeof _RaceClassificationModel

  constructor(RaceClassificationModel: typeof _RaceClassificationModel) {
    this.RaceClassificationModel = RaceClassificationModel
  }

  async create(
    createRaceClassificationDto: CreateRaceClassificationDto
  ): Promise<RaceClassification> {
    const raceClassification = await this.RaceClassificationModel.create(
      createRaceClassificationDto
    )

    const classification = raceClassification.classification.map((item) =>
      item.toJSON()
    )

    return {
      ...MongooseHelper.map<RaceClassification>(raceClassification.toJSON()),
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
      race: races
    })

    return raceClassifications
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
}
