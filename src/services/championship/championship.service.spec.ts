import Championship from '../../entities/championship.entity'
import { BonificationRepositoryAbstract } from '../../repositories/bonification/bonification.repository'
import { BonificationRepositoryStub } from '../../repositories/bonification/bonification.repository.stub'
import { ChampionshipRepositoryAbstract } from '../../repositories/championship/championship.repository'
import { DriverStandingsRepositoryAbstract } from '../../repositories/driver-standings/driver-standings.repository'
import { DriverStandingsRepositoryStub } from '../../repositories/driver-standings/driver-standings.repository.stub'
import { PenaltyRepositoryAbstract } from '../../repositories/penalty/penalty.repository'
import { PenaltyRepositoryStub } from '../../repositories/penalty/penalty.repository.stub'
import { RaceClassificationRepositoryAbstract } from '../../repositories/race-classification/race-classification.repository'
import { RaceClassificationRepositoryStub } from '../../repositories/race-classification/race-classification.repository.stub'
import { RaceRepositoryAbstract } from '../../repositories/race/race.repository'
import { RaceRepositoryStub } from '../../repositories/race/race.repository.stub'
import { S3RepositoryStub } from '../../repositories/s3/s3.repository.stub'
import { S3RepositoryAbstract } from '../../repositories/s3/s3.repository'
import { ScoringSystemRepositoryAbstract } from '../../repositories/scoring-system/scoring-system.repository'
import { ScoringSystemRepositoryStub } from '../../repositories/scoring-system/scoring-system.repository.stub'
import { TeamStandingsRepositoryAbstract } from '../../repositories/team-standings/team-standings.repository'
import { TeamStandingsRepositoryStub } from '../../repositories/team-standings/team-standings.repository.stub'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'
import { TeamRepositoryStub } from '../../repositories/team/team.repository.stub'
import {
  ChampionshipServiceAbstract,
  ChampionshipService
} from './championship.service'

describe('Championship Service', () => {
  const validChampionship: Championship = {
    id: 'valid_id',
    code: 'valid_code',
    description: 'valid_description',
    name: 'valid_name',
    platform: 'valid_platform',
    avatarImageUrl: 'valid_url',
    races: ['valid_race'],
    teams: ['valid_team'],
    drivers: [
      {
        user: 'valid_user',
        isRegistered: true,
        isRemoved: false,
        bonifications: [],
        penalties: []
      }
    ],
    admins: [],
    scoringSystem: 'valid_scoring_system',
    teamStandings: 'valid_team_standings',
    driverStandings: 'valid_driver_standings',
    bonifications: ['valid_bonification'],
    penalties: ['valid_penalty']
  }

  interface SutTypes {
    championshipRepositoryStub: ChampionshipRepositoryAbstract
    teamRepositoryStub: TeamRepositoryAbstract
    driverStandingsRepositoryStub: DriverStandingsRepositoryAbstract
    teamStandingsRepositoryStub: TeamStandingsRepositoryAbstract
    scoringSystemRepositoryStub: ScoringSystemRepositoryAbstract
    raceRepositoryStub: RaceRepositoryAbstract
    raceClassificationRepositoryStub: RaceClassificationRepositoryAbstract
    bonificationRepositoryStub: BonificationRepositoryAbstract
    penaltyRepositoryStub: PenaltyRepositoryAbstract
    s3RepositoryStub: S3RepositoryAbstract
    sut: ChampionshipServiceAbstract
  }
  const makeSut = (): SutTypes => {
    class ChampionshipRepositoryStub implements ChampionshipRepositoryAbstract {
      async create(): Promise<Championship> {
        return validChampionship
      }

      async update(): Promise<Championship> {
        return validChampionship
      }

      async getOne(): Promise<Championship> {
        return validChampionship
      }

      async getAll(): Promise<Championship[]> {
        return [validChampionship]
      }
    }

    const teamRepositoryStub = new TeamRepositoryStub()
    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const championshipRepositoryStub = new ChampionshipRepositoryStub()
    const teamStandingsRepositoryStub = new TeamStandingsRepositoryStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const raceRepositoryStub = new RaceRepositoryStub()
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()
    const bonificationRepositoryStub = new BonificationRepositoryStub()
    const penaltyRepositoryStub = new PenaltyRepositoryStub()
    const s3RepositoryStub = new S3RepositoryStub()

    const sut = new ChampionshipService(
      championshipRepositoryStub,
      teamRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      s3RepositoryStub
    )

    return {
      championshipRepositoryStub,
      teamRepositoryStub,
      driverStandingsRepositoryStub,
      teamStandingsRepositoryStub,
      scoringSystemRepositoryStub,
      raceRepositoryStub,
      raceClassificationRepositoryStub,
      s3RepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      sut
    }
  }

  it('should create the Championship Teams', async () => {
    const { sut, teamRepositoryStub, championshipRepositoryStub } = makeSut()

    const createTeamSpy = jest.spyOn(teamRepositoryStub, 'bulkCreate')

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createTeamSpy).toHaveReturned()
    expect(result.teams).toStrictEqual(['valid_team'])
  })

  it('should create the Championship Driver Standings', async () => {
    const { sut, driverStandingsRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'create'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createDriverStandingsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      standings: []
    })
    expect(createDriverStandingsSpy).toHaveReturned()
    expect(result.driverStandings).toBe('valid_driver_standings')
  })

  it('should create the Championship Team Standings', async () => {
    const { sut, teamStandingsRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createTeamStandingsSpy = jest.spyOn(
      teamStandingsRepositoryStub,
      'create'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createTeamStandingsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      standings: []
    })
    expect(createTeamStandingsSpy).toHaveReturned()
    expect(result.teamStandings).toBe('valid_team_standings')
  })

  it('should create the Championship Scoring System', async () => {
    const { sut, scoringSystemRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'create'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createScoringSystemSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      scoringSystem: { 1: 25 }
    })
    expect(createScoringSystemSpy).toHaveReturned()
    expect(result.scoringSystem).toBe('valid_scoring_system')
  })

  it('should create the Championship Races', async () => {
    const { sut, raceRepositoryStub, championshipRepositoryStub } = makeSut()

    const createScoringSystemSpy = jest.spyOn(raceRepositoryStub, 'create')

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' }
        ],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createScoringSystemSpy).toHaveBeenCalledTimes(3)
    expect(createScoringSystemSpy).toHaveReturnedTimes(3)
    expect(result.races).toStrictEqual(['valid_race'])
  })

  it('should create the Championship Bonifications', async () => {
    const { sut, bonificationRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createBonificationsSpy = jest.spyOn(
      bonificationRepositoryStub,
      'bulkCreate'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' }
        ],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 },
        bonifications: [
          { name: 'Volta mais rápida', points: 1 },
          { name: 'Pole Position', points: 1 }
        ]
      }
    })

    expect(createBonificationsSpy).toHaveBeenCalledTimes(1)
    expect(createBonificationsSpy).toHaveReturnedTimes(1)
    expect(result.bonifications).toStrictEqual(['valid_bonification'])
  })

  it('should create the Championship Penalties', async () => {
    const { sut, penaltyRepositoryStub, championshipRepositoryStub } = makeSut()

    const createPenaltiesSpy = jest.spyOn(penaltyRepositoryStub, 'bulkCreate')

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' }
        ],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 },
        penalties: [{ name: 'Colisão', points: 1 }]
      }
    })

    expect(createPenaltiesSpy).toHaveBeenCalledTimes(1)
    expect(createPenaltiesSpy).toHaveReturnedTimes(1)
    expect(result.penalties).toStrictEqual(['valid_penalty'])
  })

  it('should call S3 Repository if a avatar image is provided on creation', async () => {
    const { sut, s3RepositoryStub, championshipRepositoryStub } = makeSut()

    const uploadImageSpy = jest.spyOn(s3RepositoryStub, 'uploadImage')

    const dto = {
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        admins: [],
        scoringSystem: { 1: 25 },
        avatarImage: 'avatar_image'
      }
    }

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    await sut.create(dto as any)

    expect(uploadImageSpy).toHaveBeenCalledWith({
      file: 'avatar_image',
      fileName: validChampionship.id,
      folderName: 'championship-images'
    })
  })

  it('should create the Championship', async () => {
    const { sut, championshipRepositoryStub } = makeSut()

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [
          {
            user: 'valid_user',
            isRegistered: true,
            isRemoved: false,
            team: 'valid_id'
          }
        ],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(result).toStrictEqual(validChampionship)
  })

  it('should prepare to update', async () => {
    const {
      sut,
      teamRepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      championshipRepositoryStub,
      scoringSystemRepositoryStub
    } = makeSut()

    const bulkDeleteTeamsSpy = jest.spyOn(teamRepositoryStub, 'bulkDelete')
    const bulkDeleteBonificationsSpy = jest.spyOn(
      bonificationRepositoryStub,
      'bulkDelete'
    )
    const bulkDeletePenaltiesSpy = jest.spyOn(
      penaltyRepositoryStub,
      'bulkDelete'
    )
    const bulkDeleteScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'delete'
    )
    const bulkUpdateChampionshipSpy = jest.spyOn(
      championshipRepositoryStub,
      'update'
    )

    await sut.prepareToUpdate(validChampionship)

    expect(bulkDeleteTeamsSpy).toHaveBeenCalledWith(validChampionship.teams)
    expect(bulkDeleteBonificationsSpy).toHaveBeenCalledWith(
      validChampionship.bonifications
    )
    expect(bulkDeletePenaltiesSpy).toHaveBeenCalledWith(
      validChampionship.penalties
    )
    expect(bulkDeleteScoringSystemSpy).toHaveBeenCalledWith(
      validChampionship.scoringSystem
    )
    expect(bulkUpdateChampionshipSpy).toHaveBeenCalledWith(
      validChampionship.id,
      {
        drivers: [],
        teams: [],
        penalties: [],
        bonifications: [],
        scoringSystem: validChampionship.scoringSystem
      }
    )
  })

  // it('should create the bonifications and penalties', async () => {
  //   const { sut, bonificationRepositoryStub, penaltyRepositoryStub } = makeSut()

  //   const result = await sut.createDriversAndTeams({
  //     drives: validChampionship.drivers,
  //     teams: validChampionship.teams,
  //     championship: validChampionship.id
  //   })
  // })

  it('should update races', async () => {
    const { sut, raceRepositoryStub, raceClassificationRepositoryStub } =
      makeSut()

    const raceRepositoryBulkDeleteSpy = jest.spyOn(
      raceRepositoryStub,
      'bulkDelete'
    )
    const raceClassificationRepositoryBulkDeleteSpy = jest.spyOn(
      raceClassificationRepositoryStub,
      'bulkDelete'
    )
    const createRacesSpy = jest.spyOn(sut, 'createRaces' as any)

    await sut.updateRaces(validChampionship.id, [
      { startDate: 'valid_start_date', track: 'valid_track', id: 'valid_race' },
      { startDate: 'valid_start_date', track: 'valid_track' }
    ])

    expect(raceRepositoryBulkDeleteSpy).toHaveBeenCalledWith(['valid_id'])
    expect(raceClassificationRepositoryBulkDeleteSpy).toHaveBeenCalledWith([
      'valid_classification_id'
    ])
    expect(createRacesSpy).toHaveBeenCalledWith(validChampionship.id, [
      { id: 'valid_race', startDate: 'valid_start_date', track: 'valid_track' }
    ])
  })

  it('should update a Championship', async () => {
    const { sut } = makeSut()

    const prepareToUpdateSpy = jest.spyOn(sut, 'prepareToUpdate')
    const createDriversAndTeamsSpy = jest.spyOn(
      sut,
      'createDriversAndTeams' as any
    )
    const createPenaltiesAndBonificationsSpy = jest.spyOn(
      sut,
      'createPenaltiesAndBonifications' as any
    )
    const updateRacesSpy = jest.spyOn(sut, 'updateRaces' as any)

    const result = await sut.update(validChampionship.id, {
      bonifications: [
        { name: 'valid_bonification', points: 1, race: 'valid_race' }
      ],
      drivers: [
        { isRegistered: true, isRemoved: false, team: '1', user: 'valid_user' }
      ],
      penalties: [{ name: 'valid_penalty', points: 1, race: 'valid_race' }],
      teams: [{ id: '1', name: 'Mercedes', color: 'color' }],
      scoringSystem: { 1: 25 },
      races: [
        { startDate: 'valid_start_date', track: 'valid_track', id: 'valid_id' },
        { startDate: 'valid_start_date', track: 'valid_track' }
      ]
    })

    expect(prepareToUpdateSpy).toHaveBeenCalledWith(validChampionship)
    expect(createDriversAndTeamsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      drivers: [
        { isRegistered: true, isRemoved: false, team: '1', user: 'valid_user' }
      ],
      teams: [{ id: '1', name: 'Mercedes', color: 'color' }]
    })
    expect(createPenaltiesAndBonificationsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      penalties: [{ name: 'valid_penalty', points: 1, race: 'valid_race' }],
      bonifications: [
        { name: 'valid_bonification', points: 1, race: 'valid_race' }
      ]
    })
    expect(updateRacesSpy).toHaveBeenCalledWith(validChampionship.id, [
      { startDate: 'valid_start_date', track: 'valid_track', id: 'valid_id' },
      { startDate: 'valid_start_date', track: 'valid_track' }
    ])

    expect(result).toStrictEqual(validChampionship)
  })

  it('should get a Championship by ID', async () => {
    const { sut } = makeSut()

    jest.setTimeout(10000)

    const result = await sut.getOne({ id: 'valid_id' })

    expect(result).toStrictEqual(validChampionship)
  })

  it('should get Championships by Driver', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ driver: 'valid_user' })

    expect(result).toStrictEqual([validChampionship])
  })

  it('should get Championships by Admin', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ admin: 'valid_user' })

    expect(result).toStrictEqual([validChampionship])
  })
})
