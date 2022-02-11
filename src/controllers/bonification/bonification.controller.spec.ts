import Bonification from '../../entities/bonification.entity'
import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
import { BonificationServiceAbstract } from '../../services/bonification/bonification.service'
import {
  BonificationControllerAbstract,
  BonificationController
} from './bonification.controller'

describe('Bonification Controller', () => {
  const validBonification = {
    id: 'valid_id',
    championship: 'valid_championship',
    name: 'valid_name',
    points: 1
  }

  interface SutTypes {
    bonificationServiceStub: BonificationServiceAbstract
    sut: BonificationControllerAbstract
  }

  const makeSut = (): SutTypes => {
    class BonificationServiceStub implements BonificationServiceAbstract {
      async create(): Promise<Bonification> {
        return validBonification
      }

      async getAll(): Promise<Bonification[]> {
        return [validBonification]
      }

      async update(): Promise<Bonification> {
        return validBonification
      }

      async delete(): Promise<Bonification> {
        return validBonification
      }
    }

    const bonificationServiceStub = new BonificationServiceStub()
    const sut = new BonificationController(bonificationServiceStub)

    return { sut, bonificationServiceStub }
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
    expect(result.body).toStrictEqual(validBonification)
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

  it('should call BonificationService create method with correct values', async () => {
    const { sut, bonificationServiceStub } = makeSut()

    const createBonificationSpy = jest.spyOn(bonificationServiceStub, 'create')

    const dto = {
      championship: 'valid_championship',
      points: 1,
      name: 'valid_name'
    }

    await sut.create({ body: dto })

    expect(createBonificationSpy).toHaveBeenCalledWith(dto)
  })

  it('should return 200 when getting all Bonifications by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual([validBonification])
  })

  it('should return 400 when getting all Bonifications without providing a championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({
      query: { championship: null as any }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should call BonificationService getAll method with correct values', async () => {
    const { sut, bonificationServiceStub } = makeSut()

    const getAllBonificationsSpy = jest.spyOn(bonificationServiceStub, 'getAll')

    await sut.getAll({ query: { championship: 'valid_championship_id' } })

    expect(getAllBonificationsSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should return 500 if BonificationService getOne method throws', async () => {
    const { sut, bonificationServiceStub } = makeSut()

    jest
      .spyOn(bonificationServiceStub, 'getAll')
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
    expect(result.body).toStrictEqual(validBonification)
  })

  it('should call BonificationService update method with correct values', async () => {
    const { sut, bonificationServiceStub } = makeSut()

    const updateBonificationSpy = jest.spyOn(bonificationServiceStub, 'update')

    await sut.update({
      body: { points: 2 },
      params: { id: 'valid_id' }
    })

    expect(updateBonificationSpy).toHaveBeenCalledWith('valid_id', {
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

  it('should return 500 if BonificationService update method throws', async () => {
    const { sut, bonificationServiceStub } = makeSut()

    jest
      .spyOn(bonificationServiceStub, 'update')
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
})
