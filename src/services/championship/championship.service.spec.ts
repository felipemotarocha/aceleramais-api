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
    championshipStandingsRepositoryStub: ChampionshipRepositoryAbstract
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

      async getOne(): Promise<Championship> {
        return validChampionship
      }

      async getAll(): Promise<Championship[]> {
        return [validChampionship]
      }
    }

    const teamRepositoryStub = new TeamRepositoryStub()
    const driverStandingsRepositoryStub = new DriverStandingsRepositoryStub()
    const championshipStandingsRepositoryStub = new ChampionshipRepositoryStub()
    const teamStandingsRepositoryStub = new TeamStandingsRepositoryStub()
    const scoringSystemRepositoryStub = new ScoringSystemRepositoryStub()
    const raceRepositoryStub = new RaceRepositoryStub()
    const raceClassificationRepositoryStub =
      new RaceClassificationRepositoryStub()
    const bonificationRepositoryStub = new BonificationRepositoryStub()
    const penaltyRepositoryStub = new PenaltyRepositoryStub()
    const s3RepositoryStub = new S3RepositoryStub()

    const sut = new ChampionshipService(
      championshipStandingsRepositoryStub,
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
      championshipStandingsRepositoryStub,
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
    const { sut, teamRepositoryStub } = makeSut()

    const createTeamSpy = jest.spyOn(teamRepositoryStub, 'bulkCreate')

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createTeamSpy).toHaveBeenCalledWith([
      {
        championship: validChampionship.id,
        name: 'valid_name',
        color: 'valid_color'
      }
    ])
    expect(createTeamSpy).toHaveReturned()
    expect(result.teams).toStrictEqual(['valid_team'])
  })

  it('should create the Championship Driver Standings', async () => {
    const { sut, driverStandingsRepositoryStub } = makeSut()

    const createDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'create'
    )

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
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
    const { sut, teamStandingsRepositoryStub } = makeSut()

    const createTeamStandingsSpy = jest.spyOn(
      teamStandingsRepositoryStub,
      'create'
    )

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
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
    const { sut, scoringSystemRepositoryStub } = makeSut()

    const createScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'create'
    )

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
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
    const { sut, raceRepositoryStub } = makeSut()

    const createScoringSystemSpy = jest.spyOn(raceRepositoryStub, 'create')

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
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createScoringSystemSpy).toHaveBeenCalledTimes(3)
    expect(createScoringSystemSpy).toHaveReturnedTimes(3)
    expect(result.races).toStrictEqual(['valid_race'])
  })

  it('should create the Championship Bonifications', async () => {
    const { sut, bonificationRepositoryStub } = makeSut()

    const createBonificationsSpy = jest.spyOn(
      bonificationRepositoryStub,
      'bulkCreate'
    )

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
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
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
    const { sut, penaltyRepositoryStub } = makeSut()

    const createPenaltiesSpy = jest.spyOn(penaltyRepositoryStub, 'bulkCreate')

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
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
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
    const { sut, s3RepositoryStub } = makeSut()

    const uploadImageSpy = jest.spyOn(s3RepositoryStub, 'uploadImage')

    const dto = {
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
        admins: [],
        scoringSystem: { 1: 25 },
        avatarImage: 'avatar_image'
      }
    }

    await sut.create(dto as any)

    expect(uploadImageSpy).toHaveBeenCalledWith({
      file: 'avatar_image',
      fileName: validChampionship.id,
      folderName: 'championship-images'
    })
  })

  it('should create the Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true }],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

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
