import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _RaceModel from '../../models/race.model'
import { BaseRepositoryParams } from '../base.repository'

export interface RaceRepositoryAbstract {
  create(params: BaseRepositoryParams & { dto: CreateRaceDto }): Promise<Race>
  getOne(id: string): Promise<Race>
  getAll(
    params: BaseRepositoryParams & { dto: GetAllRacesDto }
  ): Promise<Race[]>
  update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race>
  bulkDelete(params: BaseRepositoryParams & { ids: string[] }): Promise<number>
}

class MongoRaceRepository implements RaceRepositoryAbstract {
  private readonly RaceModel: typeof _RaceModel

  constructor(RaceModel: typeof _RaceModel) {
    this.RaceModel = RaceModel
  }

  async create(
    params: BaseRepositoryParams & { dto: CreateRaceDto }
  ): Promise<Race> {
    const race = await this.RaceModel.create([params.dto], {
      session: params.session
    })

    return MongooseHelper.map<Race>(race[0].toJSON())
  }

  async getOne(id: string): Promise<Race> {
    const race = await this.RaceModel.findById(id)

    return MongooseHelper.map<Race>(race.toJSON())
  }

  async getAll(
    params: BaseRepositoryParams & { dto: GetAllRacesDto }
  ): Promise<Race[]> {
    const races = await this.RaceModel.find(params.dto || {}, null, {
      session: params?.session
    })

    return races.map((race) => MongooseHelper.map<Race>(race.toJSON()))
  }

  async update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    const race = await this.RaceModel.findByIdAndUpdate(id, updateRaceDto)

    return MongooseHelper.map<Race>(race.toJSON())
  }

  async bulkDelete(
    params: BaseRepositoryParams & { ids: string[] }
  ): Promise<number> {
    const { deletedCount } = await this.RaceModel.deleteMany(
      { _id: params.ids },
      { session: params?.session }
    )

    return deletedCount
  }
}

export default MongoRaceRepository
