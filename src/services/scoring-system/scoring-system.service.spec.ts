import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'
import { ScoringSystemRepositoryStub } from '../../repositories/scoring-system/scoring-system.repository.stub'
import {
  ScoringSystemServiceAbstract,
  ScoringSystemService
} from './scoring-system.service'

describe('Scoring System Service', () => {
  const validScoringSystem = {
    id: 'valid_id',
    championship: 'valid_championship',
    scoringSystem: { 1: 25, 2: 20 }
  }

  interface SutTypes {
    scoringSystemRepositoryStub: ScoringSystemRepositoryAbstract
    sut: ScoringSystemServiceAbstract
  }

  const makeSut = (): SutTypes => {
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const sut = new ScoringSystemService(scoringSystemRepositoryStub)

    return { scoringSystemRepositoryStub, sut }
  }

  it('should create a Scoring System', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      scoringSystem: { 1: 25, 2: 20 }
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemRepository create method with correct values', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    const createScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'create'
    )

    const dto = {
      championship: 'valid_championship',
      scoringSystem: { 1: 25, 2: 20 }
    }

    await sut.create(dto)

    expect(createScoringSystemSpy).toHaveBeenCalledWith({ dto })
  })

  it('should throws if ScoringSystemRepository create method throws', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    jest
      .spyOn(scoringSystemRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto = {
      championship: 'valid_championship',
      scoringSystem: { 1: 25, 2: 20 }
    }

    const promise = sut.create(dto)

    expect(promise).rejects.toThrow()
  })

  it('should get a ScoringSystem by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemRepository getOne method with correct values', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    const getOneScoringSystemsSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'getOne'
    )

    await sut.getOne({ championship: 'valid_championship_id' })

    expect(getOneScoringSystemsSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should throws if ScoringSystemRepository getOne method throws', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    jest
      .spyOn(scoringSystemRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getOne({ championship: 'invalid_championship_id' })

    expect(promise).rejects.toThrow()
  })

  it('should update a Scoring System', async () => {
    const { sut } = makeSut()

    const result = await sut.update('valid_id', {
      scoringSystem: { 1: 30, 2: 25 }
    })

    expect(result).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemRepository update method with correct values', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    const updateScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'update'
    )

    await sut.update('valid_id', {
      scoringSystem: { 1: 30, 2: 25 }
    })

    expect(updateScoringSystemSpy).toHaveBeenCalledWith('valid_id', {
      scoringSystem: { 1: 30, 2: 25 }
    })
  })

  it('should throws if ScoringSystemRepository update method throws', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    jest
      .spyOn(scoringSystemRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.update('invalid_id', {
      scoringSystem: { 1: 30, 2: 25 }
    })

    expect(promise).rejects.toThrow()
  })

  it('should delete a ScoringSystem', async () => {
    const { sut } = makeSut()

    const result = await sut.delete('valid_id')

    expect(result).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemRepository delete method with correct values', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    const deleteScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'delete'
    )

    await sut.delete('valid_id')

    expect(deleteScoringSystemSpy).toHaveBeenCalledWith({ id: 'valid_id' })
  })

  it('should throws if ScoringSystemRepository delete method throws', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    jest
      .spyOn(scoringSystemRepositoryStub, 'delete')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.delete('invalid_id')

    expect(promise).rejects.toThrow()
  })
})
