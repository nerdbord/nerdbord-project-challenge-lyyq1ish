import { NextRequest, NextResponse } from 'next/server'
import { createTransaction } from '@/app/actions/transactionActions'

export async function POST(req: NextRequest) {
  try {
    const { userId, amount, category, date, name, description } =
      await req.json()

    console.log('Received data:', {
      userId,
      amount,
      category,
      date,
      name,
      description,
    })

    const transaction = await createTransaction({
      amount: parseFloat(amount), // Konwersja na typ number
      category,
      date: new Date(date),
      name,
      description,
      userId,
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Unable to add transaction:', error)
    return NextResponse.json(
      { error: 'Unable to add transaction' },
      { status: 500 }
    )
  }
}
