import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import { RaceRepositoryAbstract } from '../../repositories/race/race.repository'

export interface RaceServiceAbstract {
  create(createRaceDto: CreateRaceDto): Promise<Race>
  getOne(id: string): Promise<Race>
  getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]>
  update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race>
}

class RaceService implements RaceServiceAbstract {
  private readonly raceRepository: RaceRepositoryAbstract
  private readonly raceClassificationRepository: RaceClassificationRepositoryAbstract

  constructor(
    raceRepository: RaceRepositoryAbstract,
    raceClassificationRepository: RaceClassificationRepositoryAbstract
  ) {
    this.raceRepository = raceRepository
    this.raceClassificationRepository = raceClassificationRepository
  }

  async create(createRaceDto: CreateRaceDto): Promise<Race> {
    const race = await this.raceRepository.create({ dto: createRaceDto })

    const raceClassification = await this.raceClassificationRepository.create({
      dto: {
        race: race.id,
        classification: []
      }
    })

    return await this.raceRepository.update(race.id, {
      classification: raceClassification.id
    })
  }

  async getOne(id: string): Promise<Race> {
    return await this.raceRepository.getOne(id)
  }

  async getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]> {
    return await this.raceRepository.getAll({ dto: getAllRacesDto })
  }

  async update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    return await this.raceRepository.update(id, updateRaceDto)
  }
}

export default RaceService
