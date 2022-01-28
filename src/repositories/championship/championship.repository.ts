import { CreateChampionshipMongoDto } from '../../dtos/championship.dtos'
import Championship from '../../entities/championship.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import ChampionshipModel from '../../models/championship.model'

export interface ChampionshipRepositoryAbstract {
  create(
    createChampionshipDto: CreateChampionshipMongoDto
  ): Promise<Championship>
  getOne({ championship }: { championship: string }): Promise<Championship>
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

  getOne({ championship }: { championship: string }): Promise<Championship> {
    throw new Error('Method not implemented.')
  }
}
