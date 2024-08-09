'use server'

import { prisma } from '../../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  return prisma.category.findMany()
}

export async function createCategory(name: string, icon: string, color: string) {
  const category = await prisma.category.create({
    data: { name, icon, color }
  })
  revalidatePath('/categories')
  return category
}

export async function updateCategory(id: string, name: string, icon: string, color: string) {
  const category = await prisma.category.update({
    where: { id },
    data: { name, icon, color }
  })
  revalidatePath('/categories')
  return category
}


export async function deleteCategory(id: string) {
  await prisma.category.delete({
    where: { id }
  })
  revalidatePath('/categories')
}

export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}