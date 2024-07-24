import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  try {
    const receipt = await prisma.receipt.findUnique({
      where: {
        id: id as string,
      },
    })

    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' })
    }

    const imageBuffer = Buffer.from(receipt.image, 'base64')
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(imageBuffer)
  } catch (error) {
    console.error('Error fetching receipt:', error)
    res.status(500).json({ error: 'Error fetching receipt' })
  }
}
