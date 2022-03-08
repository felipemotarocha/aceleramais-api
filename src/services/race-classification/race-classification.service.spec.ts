import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import { RaceClassificationRepositoryStub } from '../../repositories/race-classification/race-classification.repository.stub'
import RaceClassificationService, {
  RaceClassificationServiceAbstract
} from './race-classification.service'

describe('Race Classification Service', () => {
  const validRaceClassification: RaceClassification = {
    id: 'valid_id',
    race: 'valid_id',
    classification: [
      {
        position: 1,
        user: 'valid_id',
        team: 'valid_id',
        isRegistered: true,
        hasFastestLap: true,
        hasPolePosition: true
      }
    ]
  }

  const makeSut = (): RaceClassificationServiceAbstract => {
    return new RaceClassificationService(new RaceClassificationRepositoryStub())
  }

  it('should create a Race Classification', async () => {
    const sut = makeSut()

    const dto: CreateRaceClassificationDto = {
      race: 'valid_id',
      classification: [
        {
          position: 1,
          user: 'valid_id',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual({ id: validRaceClassification.id, ...dto })
  })

  it('should get a Race Classification by Race', async () => {
    const sut = makeSut()

    const result = await sut.getOne('valid_id')

    expect(result).toStrictEqual(validRaceClassification)
  })

  it('should update a Race Classification', async () => {
    const sut = makeSut()

    const dto: UpdateRaceClassificationDto = {
      classification: [
        {
          position: 1,
          user: 'valid_id',
          team: 'valid_id',
          isRegistered: true,
          hasFastestLap: true,
          hasPolePosition: true
        }
      ]
    }

    const result = await sut.update('valid_id', dto)

    expect(result).toStrictEqual(validRaceClassification)
  })
})
