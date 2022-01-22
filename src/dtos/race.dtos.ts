export interface CreateRaceDto {
  track: string
  championship: string
  startDate: string
  classification: string
}

export interface UpdateRaceDto {
  track?: string
  startDate?: string
}

export interface GetAllRacesDto {
  championship?: string
}
