import { User, Role } from '@prisma/client'

export type SafeUser = Omit<User, 'password'> & {
  createdAt: string
  updatedAt: string
}

export interface UserWithToken extends SafeUser {
  token: string
}