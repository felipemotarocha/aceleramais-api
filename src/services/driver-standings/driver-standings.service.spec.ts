import { CreateDriverStandingsDto } from '../../dtos/driver-standings.dto'
import DriverStandings from '../../entities/driver-standings.entity'
import Team from '../../entities/team.entity'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import ChampionshipRepositoryStub, {
  validChampionship
} from '../../repositories/championship/championship.repository.stub'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import {
  RaceClassificationRepositoryStub,
  validRaceClassification
} from '../../repositories/race-classification/race-classification.repository.stub'
import {
  RaceRepositoryStub,
  validRace
} from '../../repositories/race/race.repository.stub'
import { ScoringSystemRepositoryStub } from '../../repositories/scoring-system/scoring-system.repository.stub'
import {
  DriverStandingsService,
  DriverStandingsServiceAbstract
} from './driver-standings.service'

describe('Driver Standings Service', () => {
  const validDriverStandings = {
    id: 'valid_id',
    championship: 'valid_championship',
    standings: [
      {
        user: 'valid_user',
        isRegistered: true,
        isRemoved: false,
        position: 1,
        points: 10
      }
    ]
  }

  interface SutTypes {
    driverStandingsRepositoryStub: DriverStandingsRepositoryAbstract
    championshipRepositoryStub: ChampionshipRepositoryAbstract
    raceClassificationRepositoryStub: RaceClassificationRepositoryAbstract
    sut: DriverStandingsServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class DriverStandingsRepositoryStub
    implements DriverStandingsRepositoryAbstract {
      async create(): Promise<DriverStandings> {
        return validDriverStandings
      }

      async getOne(): Promise<DriverStandings> {
        return validDriverStandings
      }

      async update(): Promise<DriverStandings> {
        return validDriverStandings
      }

      async delete(): Promise<DriverStandings> {
        return validDriverStandings
      }
    }

    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const raceRepositoryStub = new RaceRepositoryStub()
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const championshipRepositoryStub = new ChampionshipRepositoryStub()

    const sut = new DriverStandingsService(
      driverStandingsRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub,
      scoringSystemRepositoryStub,
      championshipRepositoryStub
    )

    return {
      driverStandingsRepositoryStub,
      championshipRepositoryStub,
      raceClassificationRepositoryStub,
      sut
    }
  }

  it('should create a Driver Standings', async () => {
    const { sut } = makeSut()

    const dto: CreateDriverStandingsDto = {
      championship: 'valid_championship',
      standings: [
        {
          user: 'valid_user',
          isRegistered: true,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validDriverStandings)
  })

  it('should call DriverStandingsRepository create method with correct values', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const createDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'create'
    )

    const dto: CreateDriverStandingsDto = {
      championship: 'valid_championship',
      standings: [
        {
          user: 'valid_user',
          isRegistered: true,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    }

    await sut.create(dto)

    expect(createDriverStandingsSpy).toHaveBeenCalledWith({ dto })
  })

  it('should throws if DriverStandingsRepository create method throws', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    jest
      .spyOn(driverStandingsRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto: CreateDriverStandingsDto = {
      championship: 'valid_championship',
      standings: [
        {
          user: 'valid_user',
          isRegistered: true,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    }
    const promise = sut.create(dto)

    expect(promise).rejects.toThrow()
  })

  it('should get a DriverStandings by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual(validDriverStandings)
  })

  it('should call DriverStandingsRepository getOne method with correct values', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const getOneDriverStandingssSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'getOne'
    )

    await sut.getOne({ championship: 'valid_championship_id' })

    expect(getOneDriverStandingssSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should throws if DriverStandingsRepository getOne method throws', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    jest
      .spyOn(driverStandingsRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.getOne({ championship: 'invalid_championship_id' })

    expect(promise).rejects.toThrow()
  })

  it('should call DriverStandingsRepository update method with correct values', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const updateDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'update'
    )

    await sut.update('valid_id', {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    })

    expect(updateDriverStandingsSpy).toHaveBeenCalledWith('valid_id', {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    })
  })

  it('should throws if DriverStandingsRepository update method throws', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    jest
      .spyOn(driverStandingsRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const promise = sut.update('invalid_id', {
      standings: [
        {
          user: undefined,
          firstName: 'Max',
          lastName: 'Verstappen',
          isRegistered: false,
          isRemoved: false,
          position: 1,
          points: 10
        }
      ]
    })

    expect(promise).rejects.toThrow()
  })

  it('should refresh the Driver Standings', async () => {
    const {
      sut,
      driverStandingsRepositoryStub,
      championshipRepositoryStub,
      raceClassificationRepositoryStub
    } = makeSut()

    jest.spyOn(championshipRepositoryStub, 'getOne').mockReturnValueOnce(
      Promise.resolve({
        ...validChampionship,
        driverStandings: { ...validDriverStandings, standings: [] },
        drivers: [
          {
            user: {
              id: 'valid_id'
            } as any,
            isRegistered: true,
            isRemoved: false,
            bonifications: [
              {
                bonification: {
                  id: 'valid_id',
                  name: 'valid_name',
                  points: 1,
                  championship: 'valid_championship_id'
                },
                race: 'valid_race_id'
              }
            ],
            penalties: [
              {
                penalty: {
                  id: 'valid_id',
                  name: 'valid_name',
                  points: 10,
                  championship: 'valid_championship_id'
                },
                race: 'valid_race_id'
              }
            ]
          },
          {
            user: { id: 'valid_id_2' } as any,
            isRegistered: true,
            isRemoved: false,
            bonifications: [],
            penalties: []
          },
          {
            user: { id: 'valid_id_3' } as any,
            isRegistered: true,
            isRemoved: false,
            bonifications: [],
            penalties: []
          }
        ]
      })
    )

    jest.spyOn(raceClassificationRepositoryStub, 'getAll').mockReturnValueOnce(
      Promise.resolve([
        {
          ...validRaceClassification,
          race: validRace,
          classification: [
            {
              position: 1,
              user: { id: 'valid_id' } as any,
              team: {
                id: 'valid_id',
                name: 'valid_name',
                championship: 'valid_championship'
              } as Team,
              isRegistered: true,
              isRemoved: false,
              scores: true,
              hasFastestLap: true,
              hasPolePosition: true
            },
            {
              position: 2,
              user: { id: 'valid_id_2' } as any,
              team: {
                id: 'valid_id',
                name: 'valid_name',
                championship: 'valid_championship'
              } as Team,
              isRegistered: true,
              isRemoved: false,
              scores: true,
              hasFastestLap: true,
              hasPolePosition: true
            },
            {
              position: 3,
              user: { id: 'valid_id_3' } as any,
              team: {
                id: 'valid_id',
                name: 'valid_name',
                championship: 'valid_championship'
              } as Team,
              isRegistered: true,
              isRemoved: false,
              scores: false,
              hasFastestLap: true,
              hasPolePosition: true
            }
          ]
        }
      ])
    )

    const updateSpy = jest.spyOn(driverStandingsRepositoryStub, 'update')

    await sut.refresh('valid_championship_id')

    expect(updateSpy).toHaveBeenCalledWith(validDriverStandings.id, {
      standings: [
        {
          user: 'valid_id_2',
          position: 1,
          firstName: undefined,
          lastName: undefined,
          team: 'valid_id',
          isRegistered: true,
          isRemoved: false,
          points: 20
        },
        {
          user: 'valid_id',
          position: 2,
          firstName: undefined,
          lastName: undefined,
          team: 'valid_id',
          isRegistered: true,
          isRemoved: false,
          points: 16
        }
      ]
    })
  })
})
