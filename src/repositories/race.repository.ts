import { CreateRaceDto, GetAllRacesDto, UpdateRaceDto } from '../dtos/race.dtos'
import Race from '../entities/race.entity'
import MongooseHelper from '../helpers/mongoose.helpers'
import _RaceModel from '../models/race.model'

export interface RaceRepositoryAbstract {
  create(createRaceDto: CreateRaceDto): Promise<Race>
  getOne(id: string): Promise<Race>
  getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]>
  update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race>
}

class MongoRaceRepository implements RaceRepositoryAbstract {
  private readonly RaceModel: typeof _RaceModel

  constructor(RaceModel: typeof _RaceModel) {
    this.RaceModel = RaceModel
  }

  async create(createRaceDto: CreateRaceDto): Promise<Race> {
    const race = await this.RaceModel.create(createRaceDto)

    return MongooseHelper.map<Race>(race.toJSON())
  }

  getOne(id: string): Promise<Race> {
    throw new Error('Method not implemented.')
  }

  getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]> {
    throw new Error('Method not implemented.')
  }

  update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    throw new Error('Method not implemented.')
  }
}

export default MongoRaceRepository
