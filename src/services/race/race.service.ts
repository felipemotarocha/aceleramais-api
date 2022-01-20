import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'

export interface RaceServiceAbstract {
  create(createRaceDto: CreateRaceDto): Promise<Race>
  getOne(id: string): Promise<Race>
  getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]>
  update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race>
}
