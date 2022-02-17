import { CreateChampionshipMongoDto } from '../../dtos/championship.dtos'
import Championship from '../../entities/championship.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'

export interface ChampionshipRepositoryAbstract {
  create(
    createChampionshipDto: CreateChampionshipMongoDto
  ): Promise<Championship>
  getOne({ id }: { id: string }): Promise<Championship>
  getAll({
    driver,
    admin
  }: {
    driver?: string
    admin?: string
  }): Promise<Championship[]>
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

  async getOne({ id }: { id: string }): Promise<Championship> {
    const championship = await this.championshipModel.findById(id).populate([
      {
        path: 'driverStandings',
        select: 'standings'
      },
      {
        path: 'teamStandings',
        select: 'standings'
      },
      {
        path: 'nextRace',
        select: ['_id', 'track', 'startDate', '-championship']
      }
    ])

    return MongooseHelper.map<Championship>(championship.toJSON())
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
}
