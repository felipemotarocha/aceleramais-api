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

  it('should get all Bonification by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual([validBonification])
  })

  it('should call BonificationRepository getAll method with correct values', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    const getAllBonificationsSpy = jest.spyOn(
      bonificationRepositoryStub,
      'getAll'
    )

    await sut.getAll({ championship: 'valid_championship_id' })

    expect(getAllBonificationsSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should throws if BonificationRepository getAll method throws', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    jest
      .spyOn(bonificationRepositoryStub, 'getAll')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getAll({ championship: 'invalid_championship_id' })

    expect(promise).rejects.toThrow()
  })

  it('should update a Bonification', async () => {
    const { sut } = makeSut()

    const result = await sut.update('valid_id', {
      points: 2
    })

    expect(result).toStrictEqual(validBonification)
  })

  it('should call BonificationRepository update method with correct values', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    const updateBonificationSpy = jest.spyOn(
      bonificationRepositoryStub,
      'update'
    )

    await sut.update('valid_id', {
      points: 2
    })

    expect(updateBonificationSpy).toHaveBeenCalledWith('valid_id', {
      points: 2
    })
  })

  it('should throws if BonificationRepository update method throws', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    jest
      .spyOn(bonificationRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.update('invalid_id', {
      points: 2
    })

    expect(promise).rejects.toThrow()
  })

  it('should delete a Bonification', async () => {
    const { sut } = makeSut()

    const result = await sut.delete('valid_id')

    expect(result).toStrictEqual(validBonification)
  })

  it('should call BonificationRepository delete method with correct values', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    const deleteBonificationSpy = jest.spyOn(
      bonificationRepositoryStub,
      'delete'
    )

    await sut.delete('valid_id')

    expect(deleteBonificationSpy).toHaveBeenCalledWith('valid_id')
  })

  it('should throws if BonificationRepository delete method throws', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    jest
      .spyOn(bonificationRepositoryStub, 'delete')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.delete('invalid_id')

    expect(promise).rejects.toThrow()
  })
})
