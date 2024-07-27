/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { prisma } from '../../lib/prisma'

const RECEIPT_CATEGORIES = [
  'Spożywcze',
  'Elektronika',
  'Odzież',
  'Kosmetyki',
  'Artykuły gospodarstwa domowego',
  'Rozrywka',
  'Restauracje i fast food',
  'Zdrowie i leki',
  'Transport',
  'Edukacja',
  'Hobby',
  'Inne',
]

export async function analyzeReceipt(base64String: string): Promise<any> {
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
                "DATA": "DD.MM.YYYY", 
                "SKLEP": "nazwa i adres sklepu", 
                "SUMA": "kwota całkowita", 
                "NUMER_PARAGONU": "numer paragonu",
                "KATEGORIA": "wybrana kategoria",
                "OPIS": "krótki opis zakupów"
              }. 
              Jeśli jakiejś informacji brakuje, użyj "BRAK DANYCH" jako wartość. 
              Wybierz jedną kategorię z następującej listy: ${RECEIPT_CATEGORIES.join(', ')}.`,
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
    const receipt = await prisma.receipt.create({
      data: {
        date: receiptData.DATA || 'N/A',
        shop: receiptData.SKLEP || 'N/A',
        total: receiptData.SUMA || 'N/A',
        receiptNumber: receiptData.NUMER_PARAGONU || 'N/A',
        description: receiptData.OPIS || 'N/A',
        category: receiptData.KATEGORIA || 'Inne',
        image: receiptData.image || '',
      },
    })

    return receipt.id
  } catch (error) {
    console.error('Failed to save analyzed receipt:', error)
    throw new Error('Failed to save analyzed receipt')
  }
}

export async function getReceiptsForUser() {
  try {
    return await prisma.receipt.findMany({})
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
