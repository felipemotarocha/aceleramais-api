import Penalty from '../../entities/penalty.entity'
import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
import { PenaltyServiceAbstract } from '../../services/penalty/penalty.service'
import {
  PenaltyControllerAbstract,
  PenaltyController
} from './penalty.controller'

describe('Penalty Controller', () => {
  const validPenalty = {
    id: 'valid_id',
    championship: 'valid_championship',
    name: 'valid_name',
    points: 1
  }

  interface SutTypes {
    penaltyServiceStub: PenaltyServiceAbstract
    sut: PenaltyControllerAbstract
  }

  const makeSut = (): SutTypes => {
    class PenaltyServiceStub implements PenaltyServiceAbstract {
      async create(): Promise<Penalty> {
        return validPenalty
      }

      async getAll(): Promise<Penalty[]> {
        return [validPenalty]
      }

      async update(): Promise<Penalty> {
        return validPenalty
      }

      async delete(): Promise<Penalty> {
        return validPenalty
      }
    }

    const penaltyServiceStub = new PenaltyServiceStub()
    const sut = new PenaltyController(penaltyServiceStub)

    return { sut, penaltyServiceStub }
  }

  it('should return 201 on creation success', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      points: 1,
      name: 'valid_name'
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validPenalty)
  })

  it('should return 400 when not providing a name', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      points: 1
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('name'))
  })

  it('should return 400 when not providing a championship', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      points: 1
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 400 when not providing points', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      championship: 'valid_championship'
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('points'))
  })

  it('should call PenaltyService create method with correct values', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    const createPenaltySpy = jest.spyOn(penaltyServiceStub, 'create')

    const dto = {
      championship: 'valid_championship',
      points: 1,
      name: 'valid_name'
    }

    await sut.create({ body: dto })

    expect(createPenaltySpy).toHaveBeenCalledWith(dto)
  })

  it('should return 200 when getting all Penaltys by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual([validPenalty])
  })

  it('should return 400 when getting all Penaltys without providing a championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({
      query: { championship: null as any }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should call PenaltyService getAll method with correct values', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    const getAllPenaltysSpy = jest.spyOn(penaltyServiceStub, 'getAll')

    await sut.getAll({ query: { championship: 'valid_championship_id' } })

    expect(getAllPenaltysSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should return 500 if PenaltyService getOne method throws', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    jest
      .spyOn(penaltyServiceStub, 'getAll')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getAll({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on update success', async () => {
    const { sut } = makeSut()

    const result = await sut.update({
      body: { points: 2 },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validPenalty)
  })

  it('should call PenaltyService update method with correct values', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    const updatePenaltySpy = jest.spyOn(penaltyServiceStub, 'update')

    await sut.update({
      body: { points: 2 },
      params: { id: 'valid_id' }
    })

    expect(updatePenaltySpy).toHaveBeenCalledWith('valid_id', {
      points: 2
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

  it('should return 500 if PenaltyService update method throws', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    jest
      .spyOn(penaltyServiceStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.update({
      body: { points: 2 },
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
    expect(result.body).toStrictEqual(validPenalty)
  })

  it('should return 400 when not providing an id on delete', async () => {
    const { sut } = makeSut()

    const result = await sut.delete({ params: { id: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('id'))
  })

  it('should call PenaltyService delete method with correct values', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    const deletePenaltySpy = jest.spyOn(penaltyServiceStub, 'delete')

    await sut.delete({
      params: { id: 'valid_id' }
    })

    expect(deletePenaltySpy).toHaveBeenCalledWith('valid_id')
  })

  it('should call PenaltyService delete method with correct values', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    const deletePenaltySpy = jest.spyOn(penaltyServiceStub, 'delete')

    await sut.delete({
      params: { id: 'valid_id' }
    })

    expect(deletePenaltySpy).toHaveBeenCalledWith('valid_id')
  })

  it('should return 500 if PenaltyService delete method throws', async () => {
    const { sut, penaltyServiceStub } = makeSut()

    jest
      .spyOn(penaltyServiceStub, 'delete')
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
