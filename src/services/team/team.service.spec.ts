import { Types } from 'mongoose'
import Team from '../../entities/team.entity'
import { TeamRepositoryAbstract } from '../../repositories/team/team.repository'
import { TeamService, TeamServiceAbstract } from './team.service'

describe('Team Service', () => {
  const validTeam: Team = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    name: 'Mercedes',
    color: '#fff'
  }

  interface SutTypes {
    teamRepositoryStub: TeamRepositoryAbstract
    sut: TeamServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class TeamRepositoryStub implements TeamRepositoryAbstract {
      async create(): Promise<Team> {
        return validTeam
      }

      async getAll(): Promise<Team[]> {
        return [validTeam]
      }

      async update(): Promise<Team> {
        return validTeam
      }

      async delete(): Promise<Team> {
        return validTeam
      }
    }

    const teamRepositoryStub = new TeamRepositoryStub()
    const sut = new TeamService(teamRepositoryStub)

    return { teamRepositoryStub, sut }
  }

  it('should create a team', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: new Types.ObjectId() as any,
      name: 'Mercedes',
      color: '#fff'
    }

    const result = await sut.create(dto)

    expect(result).toStrictEqual(validTeam)
  })

  it('should call TeamRepository create method with correct values', async () => {
    const { sut, teamRepositoryStub } = makeSut()

    const createTeamSpy = jest.spyOn(teamRepositoryStub, 'create')

    const dto = {
      championship: new Types.ObjectId() as any,
      name: 'Mercedes',
      color: '#fff'
    }

    await sut.create(dto)

    expect(createTeamSpy).toHaveBeenCalledWith(dto)
  })

  it('should get all Teams by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ championship: 'valid_championship_id' })

    expect(result).toStrictEqual([validTeam])
  })

  it('should call TeamRepository getAll method with correct values', async () => {
    const { sut, teamRepositoryStub } = makeSut()

    const getAllTeamsSpy = jest.spyOn(teamRepositoryStub, 'getAll')

    await sut.getAll({ championship: 'valid_championship_id' })

    expect(getAllTeamsSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should update a Team', async () => {
    const { sut } = makeSut()

    const result = await sut.update('valid_id', {
      name: 'Red Bull'
    })

    expect(result).toStrictEqual(validTeam)
  })

  it('should call TeamRepository update method with correct values', async () => {
    const { sut, teamRepositoryStub } = makeSut()

    const updateTeamSpy = jest.spyOn(teamRepositoryStub, 'update')

    await sut.update('valid_id', {
      name: 'Red Bull'
    })

    expect(updateTeamSpy).toHaveBeenCalledWith('valid_id', {
      name: 'Red Bull'
    })
  })
})
