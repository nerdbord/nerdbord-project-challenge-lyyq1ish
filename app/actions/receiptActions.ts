/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '../../lib/prisma'

const RECEIPT_CATEGORIES = [
  'Spożywcze',
  'Elektronika',
  'Odzież',
  'Kosmetyki',
  'Dom',
  'Rozrywka',
  'Jedzenie',
  'Zdrowie i leki',
  'Transport',
  'Edukacja',
  'Hobby',
  'Inne',
]

export async function analyzeReceipt(base64String: string): Promise<any> {
  console.log('Starting receipt analysis')

  try {
    const response = await fetch(
      'https://training.nerdbord.io/api/v1/openai/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `Jesteś asystentem analizującym paragony. Podaj informacje w następującym formacie JSON: 
              {
                "DATA": "YYYY-MM-DD", 
                "SKLEP": "tylko nazwa sklepu czyli jak masz Rossmann SDP SP. Z O.O. to tylko Rossmann ", 
                "SUMA": "kwota całkowita",
                "WALUTA": "waluta",
                "NUMER_PARAGONU": "numer paragonu",
                "KATEGORIA": "wybrana kategoria",
                "OPIS": "krótki opis zakupów"
              }. 
              Jeśli jakiejś informacji brakuje, użyj "BRAK DANYCH" jako wartość. 
              Wybierz jedną kategorię z następującej listy: ${RECEIPT_CATEGORIES.join(', ')}.
              Jeśli nie rozpoznasz zdjęcia lub uznasz że zdjęcie nie jest paragonem, użyj "BRAK DANYCH" jako wartość.`,
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Przeanalizuj ten paragon, podaj wymagane informacje, wybierz odpowiednią kategorię i napisz krótki opis zakupów.',
                },
                { type: 'image_url', image_url: { url: base64String } },
              ],
            },
          ],
        }),
      }
    )

    console.log('Received response from GPT-4o API')

    const data = await response.json()
    console.log('GPT-4o Response:', JSON.stringify(data, null, 2))

    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsedContent = JSON.parse(jsonMatch[1])
          return parsedContent
        } catch (error) {
          console.error('Failed to parse extracted JSON:', error)
          return { error: 'Failed to parse JSON' }
        }
      } else {
        return { error: 'No JSON found in response' }
      }
    } else {
      throw new Error('Unexpected response format')
    }
  } catch (error) {
    console.error('Error analyzing receipt:', error)
    throw new Error('Error analyzing receipt')
  }
}
export async function saveAnalyzedReceipt(receiptData: any): Promise<string> {
  try {
    const user = await currentUser()
    if (!user || !user.id) throw new Error('User not authenticated or userId not found')

    let category = await prisma.category.findFirst({
      where: { name: receiptData.KATEGORIA }
    })
    if (!category) {
      category = await prisma.category.findFirst({
        where: { name: 'Inne' }
      })
    }

    const receipt = await prisma.receipt.create({
      data: {
        date: receiptData.DATA || 'N/A',
        shop: receiptData.SKLEP || 'N/A',
        total: receiptData.SUMA || 'N/A',
        receiptNumber: receiptData.NUMER_PARAGONU || 'N/A',
        description: receiptData.OPIS || 'N/A',
        categoryId: category!.id,
        image: receiptData.image || '',
        userId: user.id,
      },
    })

    console.log('Receipt saved with ID:', receipt.id)
    return receipt.id
  } catch (error: any) {
    console.error('Failed to save analyzed receipt:', error.message)
    throw new Error('Failed to save analyzed receipt')
  }
}

export async function getReceiptsForUser() {
  try {
    const user = await currentUser()
    if (!user) throw new Error('User not authenticated')

    return await prisma.receipt.findMany({
      where: {
        userId: user.id,
      },
    })
  } catch (error) {
    console.error('Failed to get receipts:', error)
    throw new Error('Failed to get receipts')
  }
}

export async function getReceiptById(receiptId: string) {
  try {
    return await prisma.receipt.findUnique({
      where: { id: receiptId },
    })
  } catch (error) {
    console.error('Failed to get receipt by ID:', error)
    throw new Error('Failed to get receipt by ID')
  }
}

export async function updateReceipt(receiptId: string, updates: any) {
  try {
    return await prisma.receipt.update({
      where: { id: receiptId },
      data: updates,
    })
  } catch (error) {
    console.error('Failed to update receipt:', error)
    throw new Error('Failed to update receipt')
  }
}

export async function deleteReceipt(receiptId: string) {
  try {
    return await prisma.receipt.delete({
      where: { id: receiptId },
    })
  } catch (error) {
    console.error('Failed to delete receipt:', error)
    throw new Error('Failed to delete receipt')
  }
}

export async function getTotalSpent() {
  const user = await currentUser()
  if (!user || !user.id) {
    throw new Error('User not authenticated or userId not found')
  }

  const receipts = await prisma.receipt.findMany({
    where: {
      userId: user.id,
    },
  })

  const total = receipts.reduce((acc, receipt) => {
    const amount = parseFloat(receipt.total || '0')
    if (isNaN(amount)) {
      console.warn(
        `Invalid amount for receipt id ${receipt.id}: ${receipt.total}`
      )
      return acc
    }
    return acc + amount
  }, 0)

  return total
}
