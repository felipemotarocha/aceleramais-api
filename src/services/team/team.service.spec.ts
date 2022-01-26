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
})
