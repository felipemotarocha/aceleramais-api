import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'
import { RaceRepositoryAbstract } from '../../repositories/race.repository'

export interface RaceServiceAbstract {
  create(createRaceDto: CreateRaceDto): Promise<Race>
  getOne(id: string): Promise<Race>
  getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]>
  update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race>
}

class RaceService implements RaceServiceAbstract {
  private readonly raceRepository: RaceRepositoryAbstract

  constructor(raceRepository: RaceRepositoryAbstract) {
    this.raceRepository = raceRepository
  }

  async create(createRaceDto: CreateRaceDto): Promise<Race> {
    return await this.raceRepository.create(createRaceDto)
  }

  async getOne(id: string): Promise<Race> {
    return await this.raceRepository.getOne(id)
  }

  async getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]> {
    throw new Error('Method not implemented.')
  }

  async update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    throw new Error('Method not implemented.')
  }
}

export default RaceService
