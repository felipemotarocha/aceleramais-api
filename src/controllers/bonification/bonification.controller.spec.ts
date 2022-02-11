import Bonification from '../../entities/bonification.entity'
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
})
