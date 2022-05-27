import {
  CreateChampionshipMongoDto,
  UpdateChampionshipMongoDto
} from '../../dtos/championship.dtos'
import Championship from '../../entities/championship.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'
import { BaseRepositoryParams } from '../base.repository'
import ChampionshipRepositoryHelpers from './championship.repository.helpers'

export interface ChampionshipRepositoryAbstract {
  create(
    params: BaseRepositoryParams & {
      dto: CreateChampionshipMongoDto
    }
  ): Promise<Championship>
  getOne(
    params: BaseRepositoryParams & {
      id?: string
      code?: string
      fullPopulate?: boolean
    }
  ): Promise<Championship | null>
  getAll({
    driver,
    admin
  }: {
    driver?: string
    admin?: string
    nameOrCode?: string
  }): Promise<Championship[]>
  update(
    params: BaseRepositoryParams & {
      id: string
      dto: UpdateChampionshipMongoDto
    }
  ): Promise<Championship>
}

export class MongoChampionshipRepository
implements ChampionshipRepositoryAbstract {
  private readonly championshipModel: typeof ChampionshipModel

  constructor(championshipModel: typeof ChampionshipModel) {
    this.championshipModel = championshipModel
  }

  async create(
    params: BaseRepositoryParams & {
      dto: CreateChampionshipMongoDto
    }
  ): Promise<Championship> {
    const championship = await this.championshipModel.create([params.dto], {
      session: params?.session
    })

    return MongooseHelper.map<Championship>(championship[0].toJSON())
  }

  async getOne(
    params: BaseRepositoryParams & {
      id?: string
      code?: string
      fullPopulate?: boolean
    }
  ): Promise<Championship | null> {
    const { id, code, fullPopulate, session } = params

    let championship: any

    if (code) {
      championship = await this.championshipModel
        .findOne({ code }, null, { session })
        .populate(
          ChampionshipRepositoryHelpers.handlePopulate(fullPopulate || false)
        )
    } else if (id) {
      championship = await this.championshipModel
        .findById(id, null, { session })
        .populate(
          ChampionshipRepositoryHelpers.handlePopulate(fullPopulate || false)
        )
    }

    if (!championship) return null

    const _championship = championship.toJSON()

    return MongooseHelper.map<Championship>({
      ..._championship,
      driverStandings: {
        ..._championship?.driverStandings,
        standings: _championship?.driverStandings?.standings.slice(0, 4)
      },
      teamStandings: {
        ..._championship?.teamStandings,
        standings: _championship?.teamStandings?.standings.slice(0, 4)
      }
    })
  }

  async getAll({
    driver,
    admin,
    nameOrCode
  }: {
    driver?: string | undefined
    admin?: string | undefined
    nameOrCode?: string
  }): Promise<Championship[]> {
    if (driver) {
      const championships = await this.championshipModel.find({
        $or: [{ 'drivers.user': driver }, { 'admins.user': driver }]
      })

      return championships.map((championship) =>
        MongooseHelper.map<Championship>(championship.toJSON())
      )
    }

    if (admin) {
      const championships = await this.championshipModel.find({
        'admins.user': admin
      })

      return championships.map((championship) =>
        MongooseHelper.map<Championship>(championship.toJSON())
      )
    }

    if (nameOrCode) {
      const championships = await this.championshipModel
        .find({
          $or: [
            { name: { $regex: new RegExp(nameOrCode, 'i') } },
            { code: { $regex: new RegExp(nameOrCode, 'i') } }
          ]
        })
        .sort({ name: 1 })

      return championships.map((championship) =>
        MongooseHelper.map<Championship>(championship.toJSON())
      )
    }

    return []
  }

  async update(
    params: BaseRepositoryParams & {
      id: string
      dto: UpdateChampionshipMongoDto
    }
  ) {
    return await this.championshipModel.findByIdAndUpdate(
      params.id,
      params.dto,
      { new: true, session: params?.session }
    )
  }
}
