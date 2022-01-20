import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'
import { MissingParamError } from '../../errors/controllers.errors'
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

    const dto = {
      trackId: 'valid_track_id',
      championshipId: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classificationId: 'valid_classification_id'
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.status).toBe(201)
    expect(result.body).toStrictEqual(validRace)
  })

  it('should return 400 if no track id is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      championshipId: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classificationId: 'valid_classification_id'
    }

    const result = await sut.create({ body: dto })

    expect(result.status).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('trackId'))
  })

  it('should return 400 if no championship id is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      trackId: 'valid_track_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classificationId: 'valid_classification_id'
    }

    const result = await sut.create({ body: dto })

    expect(result.status).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championshipId'))
  })
})
