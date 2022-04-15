import {
  CreateChampionshipMongoDto,
  UpdateChampionshipMongoDto
} from '../../dtos/championship.dtos'
import Championship from '../../entities/championship.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'
import ChampionshipRepositoryHelpers from './championship.repository.helpers'

export interface ChampionshipRepositoryAbstract {
  create(
    createChampionshipDto: CreateChampionshipMongoDto
  ): Promise<Championship>
  getOne({
    id,
    fullPopulate
  }: {
    id: string
    fullPopulate?: boolean
  }): Promise<Championship>
  getAll({
    driver,
    admin
  }: {
    driver?: string
    admin?: string
  }): Promise<Championship[]>
  update(
    id: string,
    updateChampionshipDto: UpdateChampionshipMongoDto
  ): Promise<Championship>
}

export class MongoChampionshipRepository
implements ChampionshipRepositoryAbstract {
  private readonly championshipModel: typeof ChampionshipModel

  constructor(championshipModel: typeof ChampionshipModel) {
    this.championshipModel = championshipModel
  }

  async create(
    createChampionshipDto: CreateChampionshipMongoDto
  ): Promise<Championship> {
    const championship = await this.championshipModel.create(
      createChampionshipDto
    )

    return MongooseHelper.map<Championship>(championship.toJSON())
  }

  async getOne({
    id,
    fullPopulate
  }: {
    id: string
    fullPopulate?: boolean
  }): Promise<Championship> {
    const championship = await this.championshipModel
      .findById(id)
      .populate(
        ChampionshipRepositoryHelpers.handlePopulate(fullPopulate || false)
      )

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
    admin
  }: {
    driver?: string | undefined
    admin?: string | undefined
  }): Promise<Championship[]> {
    if (driver) {
      const championships = await this.championshipModel.find({
        'drivers.user': driver
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

    return []
  }

  async update(id: string, updateChampionshipDto: UpdateChampionshipMongoDto) {
    return await this.championshipModel.findByIdAndUpdate(
      id,
      updateChampionshipDto,
      { new: true }
    )
  }
}
