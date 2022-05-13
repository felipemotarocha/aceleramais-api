interface User {
  id: string
  firstName: string
  lastName: string
  userName: string
  email: string
  provider: string
  biography?: string
  wins: number
  podiums: number
  titles: number
  profileImageUrl?: string
}

export default User
