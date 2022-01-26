import {
  CreateScoringSystemDto,
  UpdateScoringSystemDto
} from '../../dtos/scoring-system.dtos'
import ScoringSystem from '../../entities/scoring-system.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ScoringSystemModel from '../../models/scoring-system.model'

export interface ScoringSystemRepositoryAbstract {
  create(createScoringSystemDto: CreateScoringSystemDto): Promise<ScoringSystem>
  getOne({ championship }: { championship: string }): Promise<ScoringSystem>
  update(
    id: string,
    updateScoringSystemDto: UpdateScoringSystemDto
  ): Promise<ScoringSystem>
  delete(id: string): Promise<ScoringSystem>
}

export class MongoScoringSystemRepository
implements ScoringSystemRepositoryAbstract {
  private readonly scoringSystemModel: typeof ScoringSystemModel

  constructor(scoringSystemModel: typeof ScoringSystemModel) {
    this.scoringSystemModel = scoringSystemModel
  }

  async create(
    createScoringSystemDto: CreateScoringSystemDto
  ): Promise<ScoringSystem> {
    const scoringSystem = await this.scoringSystemModel.create(
      createScoringSystemDto
    )

    return MongooseHelper.map<ScoringSystem>(scoringSystem.toJSON())
  }

  async getOne({
    championship
  }: {
    championship: string
  }): Promise<ScoringSystem> {
    const scoringSystem = await this.scoringSystemModel.findOne({
      championship
    })

    return MongooseHelper.map<ScoringSystem>(scoringSystem.toJSON())
  }

  async update(
    id: string,
    updateScoringSystemDto: UpdateScoringSystemDto
  ): Promise<ScoringSystem> {
    const scoringSystem = await this.scoringSystemModel.findByIdAndUpdate(
      id,
      updateScoringSystemDto,
      { new: true }
    )

    return MongooseHelper.map<ScoringSystem>(scoringSystem.toJSON())
  }

  async delete(id: string): Promise<ScoringSystem> {
    const scoringSystem = await this.scoringSystemModel.findByIdAndDelete(id, {
      new: true
    })

    return MongooseHelper.map<ScoringSystem>(scoringSystem.toJSON())
  }
}
