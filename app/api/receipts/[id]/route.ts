import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    const receipt = await prisma.receipt.findUnique({
      where: {
        id: id,
      },
    })

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 })
    }

    const imageBuffer = Buffer.from(receipt.image, 'base64')
    return new NextResponse(imageBuffer, {
      headers: { 'Content-Type': 'image/jpeg' },
    })
  } catch (error) {
    console.error('Error fetching receipt:', error)
    return NextResponse.json(
      { error: 'Error fetching receipt' },
      { status: 500 }
    )
  }
}
