export interface CreateScoringSystemDto {
  championship: string
  scoringSystem: { [key: string]: number }
}

export interface UpdateScoringSystemDto {
  scoringSystem?: { [key: string]: number }
}
