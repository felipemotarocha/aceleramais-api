import {
  CreateRaceDto,
  GetAllRacesDto,
  UpdateRaceDto
} from '../../dtos/race.dtos'
import Race from '../../entities/race.entity'
import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
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
    championship: 'valid_championship_id',
    startDate: 'valid_start_date',
    isCompleted: true,
    classification: 'valid_classification_id'
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

      async update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
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
      championship: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classification: 'valid_classification_id'
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validRace)
  })

  it('should call RaceService create method with correct values', async () => {
    const { sut, raceServiceStub } = makeSut()

    const createRaceSpy = jest.spyOn(raceServiceStub, 'create')

    const dto = {
      trackId: 'valid_track_id',
      championship: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classification: 'valid_classification_id'
    }

    await sut.create({ body: dto })

    expect(createRaceSpy).toHaveBeenCalledWith(dto)
  })

  it('should return 400 if no track id is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classification: 'valid_classification_id'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('trackId'))
  })

  it('should return 400 if no championship id is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      trackId: 'valid_track_id',
      startDate: 'valid_start_date',
      isCompleted: true,
      classification: 'valid_classification_id'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 400 if no classification id is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      trackId: 'valid_track_id',
      championship: 'valid_championship_id',
      startDate: 'valid_start_date',
      isCompleted: true
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('classification'))
  })

  it('should return 400 if no start date is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      trackId: 'valid_track_id',
      championship: 'valid_championship_id',
      classification: 'valid_classification_id',
      isCompleted: true
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('startDate'))
  })

  it('should return 200 when getting a race by id', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ params: { id: 'valid_id' } })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validRace)
  })

  it('should call RaceService getOne method with correct values', async () => {
    const { sut, raceServiceStub } = makeSut()

    const getOneRaceSpy = jest.spyOn(raceServiceStub, 'getOne')

    await sut.getOne({ params: { id: 'valid_id' } })

    expect(getOneRaceSpy).toHaveBeenCalledWith('valid_id')
  })

  it('should return 400 when getting a race by id and not providing an id', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ params: { id: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('id'))
  })

  it('should return 200 when getting all races by championship id', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual([validRace])
  })

  it('should call RaceService getAll method with correct values', async () => {
    const { sut, raceServiceStub } = makeSut()

    const getAllRacesSpy = jest.spyOn(raceServiceStub, 'getAll')

    await sut.getAll({ query: { championship: 'valid_championship_id' } })

    expect(getAllRacesSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should return 400 when getting all races without providing a query', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ query: null as any })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on update success', async () => {
    const { sut } = makeSut()

    const result = await sut.update({
      body: { startDate: 'valid_start_date' },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validRace)
  })

  it('should call RaceService update method with correct values', async () => {
    const { sut, raceServiceStub } = makeSut()

    const updateRaceSpy = jest.spyOn(raceServiceStub, 'update')

    await sut.update({
      body: { startDate: 'valid_start_date' },
      params: { id: 'valid_id' }
    })

    expect(updateRaceSpy).toHaveBeenCalledWith('valid_id', {
      startDate: 'valid_start_date'
    })
  })

  it('should return 400 when not providing an id on update', async () => {
    const { sut } = makeSut()

    const result = await sut.update({ body: {}, params: { id: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('id'))
  })

  it('should return 400 when providing an unallowed update', async () => {
    const { sut } = makeSut()

    const result = await sut.update({
      body: { id: 'valid_id' },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new NotAllowedFieldsError())
  })
})
