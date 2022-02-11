import Bonification from '../../entities/bonification.entity'
import { BonificationRepositoryAbstract } from '../../repositories/bonification/bonification.repository'
import {
  BonificationService,
  BonificationServiceAbstract
} from './bonification.service'

describe('Bonification Service', () => {
  const validBonification = {
    id: 'valid_id',
    championship: 'valid_championship',
    name: 'Volta mais rápida',
    points: 1
  }

  interface SutTypes {
    bonificationRepositoryStub: BonificationRepositoryAbstract
    sut: BonificationServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class BonificationRepositoryStub implements BonificationRepositoryAbstract {
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

    const bonificationRepositoryStub = new BonificationRepositoryStub()
    const sut = new BonificationService(bonificationRepositoryStub)

    return { bonificationRepositoryStub, sut }
  }

  it('should create a Bonification', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      name: 'Volta mais rápida',
      points: 1
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validBonification)
  })

  it('should call BonificationRepository create method with correct values', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    const createBonificationSpy = jest.spyOn(
      bonificationRepositoryStub,
      'create'
    )

    const dto = {
      championship: 'valid_championship',
      name: 'Volta mais rápida',
      points: 1
    }

    await sut.create(dto)

    expect(createBonificationSpy).toHaveBeenCalledWith(dto)
  })

  it('should throws if BonificationRepository create method throws', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    jest
      .spyOn(bonificationRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto = {
      championship: 'valid_championship',
      name: 'Volta mais rápida',
      points: 1
    }

    const promise = sut.create(dto)

    expect(promise).rejects.toThrow()
  })
})
