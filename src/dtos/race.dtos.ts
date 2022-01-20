export interface CreateRaceDto {
  trackId: string
  championshipId: string
  startDate: string
  classificationId: string
}

export interface UpdateRaceDto {
  trackId: string
  startDate: string
}

export interface GetAllRacesDto {
  championshipId?: string
}
