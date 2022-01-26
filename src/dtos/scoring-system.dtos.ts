export interface CreateScoringSystemDto {
  championship: string
  scoringSystem: { [key: string]: number }
}

export interface UpdateScoringSystemDto {
  championship: string
  scoringSystem: { [key: string]: number }
}
