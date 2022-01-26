import ScoringSystem from '../../entities/scoring-system.entity'
import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'
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
    class ScoringSystemRepositoryStub
    implements ScoringSystemRepositoryAbstract {
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

    expect(createScoringSystemSpy).toHaveBeenCalledWith(dto)
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

  it('should get all ScoringSystems by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual(validScoringSystem)
  })

  it('should call ScoringSystemRepository getAll method with correct values', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    const getAllScoringSystemsSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'getOne'
    )

    await sut.getOne({ championship: 'valid_championship_id' })

    expect(getAllScoringSystemsSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should throws if ScoringSystemRepository getAll method throws', async () => {
    const { sut, scoringSystemRepositoryStub } = makeSut()

    jest
      .spyOn(scoringSystemRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getOne({ championship: 'invalid_championship_id' })

    expect(promise).rejects.toThrow()
  })
})
