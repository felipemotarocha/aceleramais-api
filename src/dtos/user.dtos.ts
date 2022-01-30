export interface CreateUserDto {
  id: string
  email: string
  firstName: string
  lastName: string
  userName: string
  provider: string
}

export interface UpdateUserDto {
  firstName: string
  lastName: string
  userName: string
}
