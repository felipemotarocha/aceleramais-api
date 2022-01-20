import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'
import { RaceServiceAbstract } from '../../services/race/race.service'
import RaceController, { RaceControllerAbstract } from './race.controller'

describe('Race Controller', () => {
  interface SutTypes {
    raceServiceStub: RaceServiceAbstract
    sut: RaceControllerAbstract
  }

  const validRace: Race = {
    id: 'valid_id',
    trackId: 'valid_track_id',
    championshipId: 'valid_championship_id',
    startDate: 'valid_start_date',
    isCompleted: true,
    classificationId: 'valid_classification_id'
  }

  const makeSut = (): SutTypes => {
    class RaceServiceStub implements RaceServiceAbstract {
      async create(createRaceDto: CreateRaceDto): Promise<Race> {
        return validRace
      }

      async getOne(id: string): Promise<Race> {
        return validRace
      }

      async getAll(getAllRacesDto: GetAllRacesDto): Promise<Race[]> {
        return [validRace]
      }

      async update(updateRaceDto: UpdateRaceDto): Promise<Race> {
        return validRace
      }
    }
    const raceServiceStub = new RaceServiceStub()

    const sut = new RaceController(raceServiceStub)

    return { raceServiceStub, sut }
  }

  it('should return 201 on creation success', async () => {
    const { sut } = makeSut()

    const result = await sut.create({
      body: {
        trackId: 'valid_track_id',
        championshipId: 'valid_championship_id',
        startDate: 'valid_start_date',
        isCompleted: true,
        classificationId: 'valid_classification_id'
      }
    })

    expect(result.status).toBe(201)
    expect(result.body).toStrictEqual(validRace)
  })
})
