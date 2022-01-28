export interface CreateRaceDto {
  _id?: string
  track: string
  championship: string
  startDate: string
  classification: string
}

export interface UpdateRaceDto {
  track?: string
  startDate?: string
  classification?: string
}

export interface GetAllRacesDto {
  championship?: string
}
