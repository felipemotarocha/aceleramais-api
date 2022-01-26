export interface CreateTeamDto {
  championship: string
  name: string
  color?: string
}

export interface UpdateTeamDto {
  name?: string
  color?: string
}
