import {
  CreateRaceClassificationDto,
  UpdateRaceClassificationDto
} from '../../dtos/race-classification.dtos'
import ChampionshipRepositoryStub, {
  validChampionship
} from '../../repositories/championship/championship.repository.stub'
import {
  RaceClassificationRepositoryStub,
  validRaceClassification
} from '../../repositories/race-classification/race-classification.repository.stub'
import { RaceRepositoryStub } from '../../repositories/race/race.repository.stub'
import { validRace } from '../race/race.service.stub'
import RaceClassificationService from './race-classification.service'

describe('Race Classification Service', () => {
  const makeSut = () => {
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()
    const raceRepositoryStub = new RaceRepositoryStub()
    const championshipRepositoryStub = new ChampionshipRepositoryStub()

    const sut = new RaceClassificationService(
      raceClassificationRepositoryStub,
      raceRepositoryStub,
      championshipRepositoryStub
    )

    return {
      sut,
      raceClassificationRepositoryStub,
      raceRepositoryStub,
      championshipRepositoryStub
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
          isRemoved: false,
          hasFastestLap: true,
          hasPolePosition: true,
          scores: true
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
          isRemoved: false,
          hasFastestLap: true,
          hasPolePosition: true,
          scores: true
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

  it('should update classification driver teams and isRemoved fields based on championship drivers', async () => {
    const {
      sut,
      raceClassificationRepositoryStub,
      championshipRepositoryStub
    } = makeSut()

    jest.spyOn(championshipRepositoryStub, 'getOne').mockReturnValueOnce(
      Promise.resolve({
        ...validChampionship,
        drivers: [
          {
            user: {
              id: 'valid_user'
            },
            team: {
              id: 'valid_team'
            },
            isRegistered: true,
            isRemoved: false,
            bonifications: [],
            penalties: []
          },
          {
            id: 'valid_id',
            firstName: 'Max',
            lastName: 'Verstappen',
            isRegistered: false,
            isRemoved: true,
            team: {
              id: 'valid_team'
            },
            bonifications: [],
            penalties: []
          }
        ]
      } as any)
    )

    jest.spyOn(raceClassificationRepositoryStub, 'getAll').mockReturnValueOnce(
      Promise.resolve([
        {
          ...validRaceClassification,
          classification: [
            {
              position: 1,
              user: {
                id: 'valid_user'
              },
              team: {
                id: 'valid_team_2'
              },
              isRegistered: true,
              isRemoved: false,
              hasFastestLap: false,
              hasPolePosition: false
            },
            {
              position: 2,
              id: 'valid_id',
              firstName: 'Max',
              lastName: 'Verstappen',
              isRegistered: false,
              isRemoved: false,
              team: {
                id: 'valid_team_2'
              },
              hasFastestLap: false,
              hasPolePosition: false
            }
          ]
        }
      ] as any)
    )

    const updateSpy = jest.spyOn(sut, 'update')

    await sut.refresh('valid_race')

    expect(updateSpy).toHaveBeenCalledWith(validRaceClassification.id, {
      classification: [
        {
          position: 1,
          user: 'valid_user',
          team: 'valid_team',
          isRegistered: true,
          isRemoved: false,
          hasFastestLap: false,
          hasPolePosition: false
        },
        {
          position: 2,
          id: 'valid_id',
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          isRemoved: true,
          team: 'valid_team',
          hasFastestLap: false,
          hasPolePosition: false
        }
      ]
    })
  })
})
