// app/actions/receiptActions.ts
'use server'

import { prisma } from '../../lib/prisma'

export async function uploadReceipt(base64String: string): Promise<string> {
  try {
    console.log('Base64 String:', base64String)

    const receipt = await prisma.receipt.create({
      data: {
        image: base64String,
      },
    })

    console.log('Receipt stored with ID:', receipt.id)
    return receipt.id
  } catch (error) {
    console.error('Failed to store receipt:', error)
    throw new Error('Failed to store receipt')
  }
}

export async function analyzeReceipt(receiptId: string): Promise<string> {
  try {
    const receipt = await prisma.receipt.findUnique({
      where: {
        id: receiptId,
      },
    })

    if (!receipt) {
      throw new Error('Receipt not found')
    }

    console.log('Analyzing image from receipt ID:', receiptId)
    console.log('Image Base64:', receipt.image)

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
            { role: 'system', content: 'jesteś asystentem ds zakupów' },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Oto paragon, przeanalizuj co zostało kupione i ile w sumie wydano pieniędzy',
                },
                { type: 'image_url', image_url: { url: receipt.image } },
              ],
            },
          ],
        }),
      }
    )

    const data = await response.json()
    console.log('GPT-4o Response:', JSON.stringify(data, null, 2))

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content
    } else {
      throw new Error('Unexpected response format')
    }
  } catch (error) {
    console.error('Error analyzing receipt:', error)
    throw new Error('Error analyzing receipt')
  }
}
