'use server'

import { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export type CreateUserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

export async function createUser(data: CreateUserPayload): Promise<User> {
  try {
    const user = await prisma.user.create({
      data,
    })
    return user
  } catch (error) {
    console.error('Failed to create user:', error)
    throw new Error('Failed to create user')
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    console.error('Failed to fetch users:', error)
    throw new Error('Failed to fetch users')
  }
}
