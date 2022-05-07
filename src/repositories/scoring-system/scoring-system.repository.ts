import {
  CreateScoringSystemDto,
  UpdateScoringSystemDto
} from '../../dtos/scoring-system.dtos'
import ScoringSystem from '../../entities/scoring-system.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ScoringSystemModel from '../../models/scoring-system.model'
import { BaseRepositoryParams } from '../base.repository'

export interface ScoringSystemRepositoryAbstract {
  create(
    params: BaseRepositoryParams & { dto: CreateScoringSystemDto }
  ): Promise<ScoringSystem>
  getOne({ championship }: { championship: string }): Promise<ScoringSystem>
  update(
    id: string,
    updateScoringSystemDto: UpdateScoringSystemDto
  ): Promise<ScoringSystem>
  delete(
    params: BaseRepositoryParams & {
      id: string
    }
  ): Promise<ScoringSystem>
}

export class MongoScoringSystemRepository
implements ScoringSystemRepositoryAbstract {
  private readonly scoringSystemModel: typeof ScoringSystemModel

  constructor(scoringSystemModel: typeof ScoringSystemModel) {
    this.scoringSystemModel = scoringSystemModel
  }

  async create(
    params: BaseRepositoryParams & { dto: CreateScoringSystemDto }
  ): Promise<ScoringSystem> {
    const scoringSystem = await this.scoringSystemModel.create([params.dto], {
      session: params?.session
    })

    return MongooseHelper.map<ScoringSystem>(scoringSystem[0].toJSON())
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

  async delete(
    params: BaseRepositoryParams & { id: string }
  ): Promise<ScoringSystem> {
    const scoringSystem = await this.scoringSystemModel
      .findByIdAndDelete(params.id, {
        new: true,
        session: params?.session
      })
      .session(params.session!)

    if (!scoringSystem) return null as any

    return MongooseHelper.map<ScoringSystem>(scoringSystem.toJSON())
  }
}
