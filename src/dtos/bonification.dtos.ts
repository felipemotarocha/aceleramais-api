export interface CreateBonificationDto {
  name: string
  points: number
  championship: string
}

export interface UpdateBonificationDto {
  name?: string
  points?: number
}
