import ScoringSystem from '../../entities/scoring-system.entity'
import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
import { ScoringSystemServiceAbstract } from '../../services/scoring-system/scoring-system.service'
import {
  ScoringSystemControllerAbstract,
  ScoringSystemController
} from './scoring-system.controller'

describe('Scoring System Controller', () => {
  const validScoringSystem = {
    id: 'valid_id',
    championship: 'valid_championship',
    scoringSystem: { 1: 25, 2: 20 }
  }

  interface SutTypes {
    scoringSystemServiceStub: ScoringSystemServiceAbstract
    sut: ScoringSystemControllerAbstract
  }

  const makeSut = (): SutTypes => {
    class ScoringSystemServiceStub implements ScoringSystemServiceAbstract {
      async create(): Promise<ScoringSystem> {
        return validScoringSystem
      }

      async getOne(): Promise<ScoringSystem> {
        return validScoringSystem
      }

      async update(): Promise<ScoringSystem> {
        return validScoringSystem
      }

      async delete(): Promise<ScoringSystem> {
        return validScoringSystem
      }
    }

    const scoringSystemServiceStub = new ScoringSystemServiceStub()
    const sut = new ScoringSystemController(scoringSystemServiceStub)

    return { sut, scoringSystemServiceStub }
  }

  it('should return 201 on creation success', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      scoringSystem: { 1: 25, 2: 20 }
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemService create method with correct values', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    const createScoringSystemSpy = jest.spyOn(
      scoringSystemServiceStub,
      'create'
    )

    const dto = {
      championship: 'valid_championship',
      scoringSystem: { 1: 25, 2: 20 }
    }

    await sut.create({ body: dto })

    expect(createScoringSystemSpy).toHaveBeenCalledWith(dto)
  })

  it('should return 400 if no championship is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      scoringSystem: { 1: 25, 2: 20 }
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 400 if no scoring system is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('scoringSystem'))
  })

  it('should return 500 if ScoringSystemService create method throws', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    jest
      .spyOn(scoringSystemServiceStub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto = {
      championship: 'valid_championship',
      scoringSystem: { 1: 25, 2: 20 }
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 when getting all ScoringSystems by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemService getOne method with correct values', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    const getOneScoringSystemsSpy = jest.spyOn(
      scoringSystemServiceStub,
      'getOne'
    )

    await sut.getOne({ query: { championship: 'valid_championship_id' } })

    expect(getOneScoringSystemsSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should return 400 when getting all ScoringSystems without providing a query', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ query: undefined })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('query'))
  })

  it('should return 400 when getting all ScoringSystems without providing a Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ query: { championship: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 500 if ScoringSystemService getOne method throws', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    jest
      .spyOn(scoringSystemServiceStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getOne({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on update success', async () => {
    const { sut } = makeSut()

    const result = await sut.update({
      body: { scoringSystem: { 1: 30, 2: 25 } },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemService update method with correct values', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    const updateScoringSystemSpy = jest.spyOn(
      scoringSystemServiceStub,
      'update'
    )

    await sut.update({
      body: { scoringSystem: { 1: 30, 2: 25 } },
      params: { id: 'valid_id' }
    })

    expect(updateScoringSystemSpy).toHaveBeenCalledWith('valid_id', {
      scoringSystem: { 1: 30, 2: 25 }
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
      body: { id: 'valid_id', championship: 'valid_championship' },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new NotAllowedFieldsError())
  })

  it('should return 500 if ScoringSystemService update method throws', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    jest
      .spyOn(scoringSystemServiceStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.update({
      body: { scoringSystem: { 1: 30, 2: 25 } },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on delete success', async () => {
    const { sut } = makeSut()

    const result = await sut.delete({
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validScoringSystem)
  })

  it('should return 400 when not providing an id on delete', async () => {
    const { sut } = makeSut()

    const result = await sut.delete({ params: { id: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('id'))
  })

  it('should call ScoringSystemService delete method with correct values', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    const deleteScoringSystemSpy = jest.spyOn(
      scoringSystemServiceStub,
      'delete'
    )

    await sut.delete({
      params: { id: 'valid_id' }
    })

    expect(deleteScoringSystemSpy).toHaveBeenCalledWith('valid_id')
  })

  it('should return 400 when not providing params on delete', async () => {
    const { sut } = makeSut()

    const result = await sut.delete({ params: undefined })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('params'))
  })

  it('should call ScoringSystemService delete method with correct values', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    const deleteScoringSystemSpy = jest.spyOn(
      scoringSystemServiceStub,
      'delete'
    )

    await sut.delete({
      params: { id: 'valid_id' }
    })

    expect(deleteScoringSystemSpy).toHaveBeenCalledWith('valid_id')
  })

  it('should return 500 if ScoringSystemService delete method throws', async () => {
    const { sut, scoringSystemServiceStub } = makeSut()

    jest
      .spyOn(scoringSystemServiceStub, 'delete')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.delete({
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })
})
