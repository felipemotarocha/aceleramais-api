import { Types } from 'mongoose'

import { CreateTeamDto, UpdateTeamDto } from '../../dtos/team.dtos'
import Team from '../../entities/team.entity'
import { MissingParamError } from '../../errors/controllers.errors'
import { TeamServiceAbstract } from '../../services/team/team.service'
import { TeamController, TeamControllerAbstract } from './team.controller'

describe('Team Controller', () => {
  const validTeam: Team = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    name: 'Mercedes',
    color: '#fff'
  }

  interface SutTypes {
    teamServiceStub: TeamServiceAbstract
    sut: TeamControllerAbstract
  }

  const makeSut = (): SutTypes => {
    class TeamServiceStub implements TeamServiceAbstract {
      async create(createTeamDto: CreateTeamDto): Promise<Team> {
        return validTeam
      }

      async getAll({
        championship
      }: {
        championship: string
      }): Promise<Team[]> {
        return [validTeam]
      }

      async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        return validTeam
      }

      async delete(id: string): Promise<Team> {
        return validTeam
      }
    }

    const teamServiceStub = new TeamServiceStub()
    const sut = new TeamController(teamServiceStub)

    return { sut, teamServiceStub }
  }

  it('should return 201 on creation success', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      name: 'valid_name',
      color: 'valid_color'
    }

    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validTeam)
  })

  it('should call TeamService create method with correct values', async () => {
    const { sut, teamServiceStub } = makeSut()

    const createTeamSpy = jest.spyOn(teamServiceStub, 'create')

    const dto = {
      championship: 'valid_championship',
      name: 'valid_name',
      color: 'valid_color'
    }

    await sut.create({ body: dto })

    expect(createTeamSpy).toHaveBeenCalledWith(dto)
  })

  it('should return 400 if no championship is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      color: 'valid_color'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      championship: 'valid_championship',
      color: 'valid_color'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('name'))
  })
})
