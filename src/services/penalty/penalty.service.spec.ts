import Penalty from '../../entities/penalty.entity'
import { PenaltyRepositoryAbstract } from '../../repositories/penalty/penalty.repository'
import { PenaltyService, PenaltyServiceAbstract } from './penalty.service'

export const validPenalty = {
  id: 'valid_id',
  championship: 'valid_championship',
  name: 'Volta mais rápida',
  points: 1
}

describe('Penalty Service', () => {
  interface SutTypes {
    penaltyRepositoryStub: PenaltyRepositoryAbstract
    sut: PenaltyServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class PenaltyRepositoryStub implements PenaltyRepositoryAbstract {
      async create(): Promise<Penalty> {
        return validPenalty
      }

      async bulkCreate(): Promise<Penalty[]> {
        return [validPenalty]
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

    const penaltyRepositoryStub = new PenaltyRepositoryStub()
    const sut = new PenaltyService(penaltyRepositoryStub)

    return { penaltyRepositoryStub, sut }
  }

  it('should create a Penalty', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      name: 'Volta mais rápida',
      points: 1
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validPenalty)
  })

  it('should call PenaltyRepository create method with correct values', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    const createPenaltySpy = jest.spyOn(penaltyRepositoryStub, 'create')

    const dto = {
      championship: 'valid_championship',
      name: 'Volta mais rápida',
      points: 1
    }

    await sut.create(dto)

    expect(createPenaltySpy).toHaveBeenCalledWith(dto)
  })

  it('should throws if PenaltyRepository create method throws', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    jest
      .spyOn(penaltyRepositoryStub, 'create')
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

  it('should get all Penalty by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual([validPenalty])
  })

  it('should call PenaltyRepository getAll method with correct values', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    const getAllPenaltysSpy = jest.spyOn(penaltyRepositoryStub, 'getAll')

    await sut.getAll({ championship: 'valid_championship_id' })

    expect(getAllPenaltysSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should throws if PenaltyRepository getAll method throws', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    jest
      .spyOn(penaltyRepositoryStub, 'getAll')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getAll({ championship: 'invalid_championship_id' })

    expect(promise).rejects.toThrow()
  })

  it('should update a Penalty', async () => {
    const { sut } = makeSut()

    const result = await sut.update('valid_id', {
      points: 2
    })

    expect(result).toStrictEqual(validPenalty)
  })

  it('should call PenaltyRepository update method with correct values', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    const updatePenaltySpy = jest.spyOn(penaltyRepositoryStub, 'update')

    await sut.update('valid_id', {
      points: 2
    })

    expect(updatePenaltySpy).toHaveBeenCalledWith('valid_id', {
      points: 2
    })
  })

  it('should throws if PenaltyRepository update method throws', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    jest
      .spyOn(penaltyRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.update('invalid_id', {
      points: 2
    })

    expect(promise).rejects.toThrow()
  })

  it('should delete a Penalty', async () => {
    const { sut } = makeSut()

    const result = await sut.delete('valid_id')

    expect(result).toStrictEqual(validPenalty)
  })

  it('should call PenaltyRepository delete method with correct values', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    const deletePenaltySpy = jest.spyOn(penaltyRepositoryStub, 'delete')

    await sut.delete('valid_id')

    expect(deletePenaltySpy).toHaveBeenCalledWith('valid_id')
  })

  it('should throws if PenaltyRepository delete method throws', async () => {
    const { sut, penaltyRepositoryStub } = makeSut()

    jest
      .spyOn(penaltyRepositoryStub, 'delete')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.delete('invalid_id')

    expect(promise).rejects.toThrow()
  })
})
