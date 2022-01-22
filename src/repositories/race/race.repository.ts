import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _RaceModel from '../../models/race.model'

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

  async getOne(id: string): Promise<Race> {
    const race = await this.RaceModel.findById(id)

    return MongooseHelper.map<Race>(race.toJSON())
  }

  async getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]> {
    const races = await this.RaceModel.find(getAllRacesDto || {})

    return races.map((race) => MongooseHelper.map<Race>(race.toJSON()))
  }

  async update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    const race = await this.RaceModel.findByIdAndUpdate(id, updateRaceDto)

    return MongooseHelper.map<Race>(race.toJSON())
  }
}

export default MongoRaceRepository
