import RaceClassification from '../../entities/race-classification.entity'

import { RaceClassificationServiceAbstract } from '../../services/race-classification/race-classification.service'
import RaceClassificationController, {
  RaceClassificationControllerAbstract
} from './race-classification.controller'

describe('Race Classification Controller', () => {
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

  interface SutTypes {
    sut: RaceClassificationControllerAbstract
    raceClassificationServiceStub: RaceClassificationServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class RaceClassificationServiceStub
    implements RaceClassificationServiceAbstract {
      async create(): Promise<RaceClassification> {
        return validRaceClassification
      }

      async getOne(): Promise<RaceClassification> {
        return validRaceClassification
      }

      async update(): Promise<RaceClassification> {
        return validRaceClassification
      }
    }

    const raceClassificationServiceStub = new RaceClassificationServiceStub()
    const sut = new RaceClassificationController(raceClassificationServiceStub)

    return { sut, raceClassificationServiceStub }
  }

  it('should return 200 on getting a Race Classification by Race ID', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({
      query: {
        race: validRaceClassification.race
      }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validRaceClassification)
  })

  // it('should return 400 if RaceClassificationService getOne method throws', async () => {
  //   const { sut, raceClassificationServiceStub } = makeSut()

  //   jest
  //     .spyOn(raceClassificationServiceStub, 'getOne')
  //     .mockReturnValueOnce(
  //       new Promise((_resolve, reject) => reject(new Error()))
  //     )

  //   const result = await sut.getOne({
  //     query: {
  //       race: validRaceClassification.race
  //     }
  //   })

  //   expect(result.statusCode).toBe(400)
  //   expect(result.body).toStrictEqual(new ServerError())
  // })
})
