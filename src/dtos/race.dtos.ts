export interface CreateRaceDto {
  trackId: string
  championship: string
  startDate: string
  classification: string
}

export interface UpdateRaceDto {
  trackId?: string
  startDate?: string
}

export interface GetAllRacesDto {
  championship?: string
}
