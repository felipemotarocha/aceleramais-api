import ScoringSystem from '../../entities/scoring-system.entity'
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
})
