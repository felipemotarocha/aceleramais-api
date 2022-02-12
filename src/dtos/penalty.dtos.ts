export interface CreatePenaltyDto {
  name: string
  points: number
  championship: string
}

export interface UpdatePenaltyDto {
  name?: string
  points?: number
}
