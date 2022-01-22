import { CreateRaceClassificationDto } from '../../dtos/race-classification.dtos'
import RaceClassfication from '../../entities/race-classification.entity'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import RaceClassificationService, {
  RaceClassificationServiceAbstract
} from './race-classification.service'

describe('Race Classification Service', () => {
  const validRaceClassification: RaceClassfication = {
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
    class RaceClassificationRepositoryStub
    implements RaceClassificationRepositoryAbstract {
      async create(): Promise<RaceClassfication> {
        return validRaceClassification
      }

      async getOne(): Promise<RaceClassfication> {
        return validRaceClassification
      }

      async update(): Promise<RaceClassfication> {
        return validRaceClassification
      }
    }

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
})
