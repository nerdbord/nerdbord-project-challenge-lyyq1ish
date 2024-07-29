/* eslint-disable prettier/prettier */
'use server'

import { prisma } from '../../lib/prisma'
import { User } from '@prisma/client'

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
