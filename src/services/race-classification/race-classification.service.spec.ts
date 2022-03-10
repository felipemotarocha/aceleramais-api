import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import RaceClassification from '../../entities/race-classification.entity'
import { RaceClassificationRepositoryStub } from '../../repositories/race-classification/race-classification.repository.stub'
import { RaceRepositoryStub } from '../../repositories/race/race.repository.stub'
import { validRace } from '../race/race.service.stub'
import RaceClassificationService from './race-classification.service'

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

  const makeSut = () => {
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()
    const raceRepositoryStub = new RaceRepositoryStub()

    const sut = new RaceClassificationService(
      raceClassificationRepositoryStub,
      raceRepositoryStub
    )

    return {
      sut,
      raceClassificationRepositoryStub,
      raceRepositoryStub
    }
  }

  it('should create a Race Classification', async () => {
    const { sut } = makeSut()

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
    const { sut } = makeSut()

    const result = await sut.getOne('valid_id')

    expect(result).toStrictEqual(validRaceClassification)
  })

  it('should update a Race Classification', async () => {
    const { sut, raceRepositoryStub, raceClassificationRepositoryStub } =
      makeSut()

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

    jest.spyOn(raceClassificationRepositoryStub, 'update').mockReturnValueOnce(
      Promise.resolve({
        ...validRaceClassification,
        race: validRace
      })
    )

    const updateRaceSpy = jest.spyOn(raceRepositoryStub, 'update')

    const result = await sut.update('valid_id', dto)

    expect(updateRaceSpy).toHaveBeenCalledWith('valid_id', {
      isCompleted: true
    })

    expect(result).toStrictEqual({
      ...validRaceClassification,
      race: validRace
    })
  })

  it('should update a Race Classification with an empty Classification', async () => {
    const { sut, raceRepositoryStub, raceClassificationRepositoryStub } =
      makeSut()

    const dto: UpdateRaceClassificationDto = {
      classification: []
    }

    jest.spyOn(raceClassificationRepositoryStub, 'update').mockReturnValueOnce(
      Promise.resolve({
        ...validRaceClassification,
        classification: [],
        race: validRace
      })
    )

    const updateRaceSpy = jest.spyOn(raceRepositoryStub, 'update')

    const result = await sut.update('valid_id', dto)

    expect(updateRaceSpy).toHaveBeenCalledWith('valid_id', {
      isCompleted: false
    })

    expect(result).toStrictEqual({
      ...validRaceClassification,
      classification: [],
      race: validRace
    })
  })
})
