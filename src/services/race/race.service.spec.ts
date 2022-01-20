import Race from '../../entities/race.entity'
import { RaceRepositoryAbstract } from '../../repositories/race.repository'
import RaceService, { RaceServiceAbstract } from './race.service'

describe('Race Service', () => {
  const validRace: Race = {
    id: 'valid_id',
    trackId: 'valid_track_id',
    championshipId: 'valid_championship_id',
    startDate: 'valid_start_date',
    isCompleted: true,
    classificationId: 'valid_classification_id'
  }

  interface SutTypes {
    raceRepositoryStub: RaceRepositoryAbstract
    sut: RaceServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class RaceRepositoryStub implements RaceRepositoryAbstract {
      async create(): Promise<Race> {
        return validRace
      }

      async getOne(): Promise<Race> {
        return validRace
      }

      async getAll(): Promise<Race[]> {
        return [validRace]
      }

      async update(): Promise<Race> {
        return validRace
      }
    }

    const raceRepositoryStub = new RaceRepositoryStub()
    const sut = new RaceService(raceRepositoryStub)

    return { sut, raceRepositoryStub }
  }

  it('should create a race', async () => {
    const { sut } = makeSut()

    const dto = {
      trackId: 'valid_track_id',
      championshipId: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classificationId: 'valid_classification_id'
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validRace)
  })
})
