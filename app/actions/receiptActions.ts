'use server'

import { prisma } from '../../lib/prisma'

export async function uploadReceipt(image: string): Promise<string> {
  try {
    const receipt = await prisma.receipt.create({
      data: {
        image,
      },
    })

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host =
      process.env.NODE_ENV === 'production'
        ? process.env.URL || process.env.DEPLOY_URL
        : 'localhost:3000'

    return `${protocol}://${host}/api/receipts/${receipt.id}`
  } catch (error) {
    console.error('Failed to store receipt:', error)
    throw new Error('Failed to store receipt')
  }
}

export async function analyzeReceipt(
  imageUrl: string = 'https://img12.dmty.pl//uploads/202112/1640607424_mqpjih_600.jpg'
): Promise<string> {
  try {
    console.log('Analyzing image from URL:', imageUrl)

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
                  text: 'Oto paragon z biedronki, przeanalizuj co zostało kupione i ile w sumie wydano pieniędzy',
                },
                { type: 'image_url', image_url: { url: imageUrl } },
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
