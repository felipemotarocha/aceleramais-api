import { Types } from 'mongoose'

import { CreateTeamDto, UpdateTeamDto } from '../../dtos/team.dtos'
import Team from '../../entities/team.entity'
import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
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

  it('should return 400 if TeamService create method throws', async () => {
    const { sut, teamServiceStub } = makeSut()

    jest
      .spyOn(teamServiceStub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto = {
      name: 'valid_name',
      championship: 'valid_championship',
      color: 'valid_color'
    }
    const result = await sut.create({
      body: dto
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 when getting all Teams by Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual([validTeam])
  })

  it('should call TeamService getAll method with correct values', async () => {
    const { sut, teamServiceStub } = makeSut()

    const getAllTeamsSpy = jest.spyOn(teamServiceStub, 'getAll')

    await sut.getAll({ query: { championship: 'valid_championship_id' } })

    expect(getAllTeamsSpy).toHaveBeenCalledWith({
      championship: 'valid_championship_id'
    })
  })

  it('should return 400 when getting all Teams without providing a query', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ query: null as any })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('championship'))
  })

  it('should return 400 if TeamService getAll method throws', async () => {
    const { sut, teamServiceStub } = makeSut()

    jest
      .spyOn(teamServiceStub, 'getAll')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getAll({
      query: { championship: 'valid_championship_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on update success', async () => {
    const { sut } = makeSut()

    const result = await sut.update({
      body: { name: 'valid_name', color: 'valid_color' },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validTeam)
  })

  it('should call TeamService update method with correct values', async () => {
    const { sut, teamServiceStub } = makeSut()

    const updateTeamSpy = jest.spyOn(teamServiceStub, 'update')

    await sut.update({
      body: { name: 'valid_name', color: 'valid_color' },
      params: { id: 'valid_id' }
    })

    expect(updateTeamSpy).toHaveBeenCalledWith('valid_id', {
      name: 'valid_name',
      color: 'valid_color'
    })
  })

  it('should return 400 when not providing an id on update', async () => {
    const { sut } = makeSut()

    const result = await sut.update({ body: {}, params: { id: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('id'))
  })

  it('should return 400 when providing an unallowed update', async () => {
    const { sut } = makeSut()

    const result = await sut.update({
      body: { id: 'valid_id' },
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new NotAllowedFieldsError())
  })

  it('should return 500 if TeamService update method throws', async () => {
    const { sut, teamServiceStub } = makeSut()

    jest
      .spyOn(teamServiceStub, 'update')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const dto = {
      name: 'valid_name'
    }

    const result = await sut.update({
      body: dto,
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on delete success', async () => {
    const { sut } = makeSut()

    const result = await sut.delete({
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validTeam)
  })
})
