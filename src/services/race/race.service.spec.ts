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

  it('should call RaceRepository create method with correct values', async () => {
    const { sut, raceRepositoryStub } = makeSut()

    const createRaceSpy = jest.spyOn(raceRepositoryStub, 'create')

    const dto = {
      trackId: 'valid_track_id',
      championshipId: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classificationId: 'valid_classification_id'
    }

    await sut.create(dto)

    expect(createRaceSpy).toHaveBeenCalledWith(dto)
  })

  it('should get a race by id', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne('valid_id')

    expect(result).toStrictEqual(validRace)
  })

  it('should call RaceRepository getOne method with correct values', async () => {
    const { sut, raceRepositoryStub } = makeSut()

    const getOneRaceSpy = jest.spyOn(raceRepositoryStub, 'getOne')

    await sut.getOne('valid_id')

    expect(getOneRaceSpy).toHaveBeenCalledWith('valid_id')
  })

  it('should get all races', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ championshipId: 'valid_championship_id' })

    expect(result).toStrictEqual([validRace])
  })

  it('should call RaceRepository getOne method with correct values', async () => {
    const { sut, raceRepositoryStub } = makeSut()

    const getOneRaceSpy = jest.spyOn(raceRepositoryStub, 'getOne')

    await sut.getOne('valid_id')

    expect(getOneRaceSpy).toHaveBeenCalledWith('valid_id')
  })

  it('should update a race', async () => {
    const { sut } = makeSut()

    const result = await sut.update('valid_id', {
      startDate: 'valid_start_date'
    })

    expect(result).toStrictEqual(validRace)
  })

  it('should call RaceRepository update method with correct values', async () => {
    const { sut, raceRepositoryStub } = makeSut()

    const updateRaceSpy = jest.spyOn(raceRepositoryStub, 'update')

    await sut.update('valid_id', {
      startDate: 'valid_start_date'
    })

    expect(updateRaceSpy).toHaveBeenCalledWith('valid_id', {
      startDate: 'valid_start_date'
    })
  })
})
