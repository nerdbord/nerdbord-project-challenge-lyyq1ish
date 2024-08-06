// app/api/spendings/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface CategoryTotals {
  [key: string]: number
}

export async function GET() {
  try {
    const receipts = await prisma.receipt.findMany({
      select: {
        date: true,
        total: true,
      },
    })

    const categoryTotals = receipts.reduce<CategoryTotals>((acc, receipt) => {
      if (receipt.date && receipt.total) {
        const month = new Date(receipt.date).toLocaleString('default', {
          month: 'long',
        })
        const amount = parseFloat(receipt.total) || 0
        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month] += amount
      }
      return acc
    }, {})

    const total = Object.values(categoryTotals).reduce(
      (acc, amount) => acc + amount,
      0
    )

    const data = Object.values(categoryTotals)
    const monthLabels = Object.keys(categoryTotals)

    return NextResponse.json({ totalExpenses: total, data, monthLabels })
  } catch (error) {
    console.error('Error fetching spendings:', error)
    return NextResponse.json(
      { error: 'Error fetching spendings' },
      { status: 500 }
    )
  }
}
