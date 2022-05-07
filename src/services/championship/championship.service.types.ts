import { Championship, CreateChampionshipDto, UpdateChampionshipDto } from '.'

export interface CreateParams {
  id?: string
  dto: CreateChampionshipDto
}

export interface GetOneParams {
  id: string
  fullPopulate?: boolean
}

export interface GetAllParams {
  driver?: string
  admin?: string
  nameOrCode?: string
}

export interface UpdateParams {
  id: string
  dto: UpdateChampionshipDto
}

export interface ChampionshipServiceAbstract {
  create(params: CreateParams): Promise<Championship>
  getOne(params: GetOneParams): Promise<Championship | null>
  getAll(params: GetAllParams): Promise<Championship[]>
  update(params: UpdateParams): Promise<Championship>
}
