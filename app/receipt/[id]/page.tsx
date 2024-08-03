'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getReceiptById } from '@/app/actions/receiptActions'

interface Receipt {
  id: string
  image: string | null
  date: string | null
  shop: string | null
  total: string | null
  receiptNumber: string | null
  category: string | null
  description: string | null
}

export default function ReceiptDetails() {
  const [receipt, setReceipt] = useState<Receipt | null>(null)
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    async function fetchReceipt() {
      try {
        if (id) {
          const fetchedReceipt = await getReceiptById(id as string)
          setReceipt(fetchedReceipt)
        }
      } catch (error) {
        console.error('Error fetching receipt details:', error)
      }
    }
    fetchReceipt()
  }, [id])

  const handleBackClick = () => {
    router.push('/spendings')
  }

  if (!receipt) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <button
        className="mb-4 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        onClick={handleBackClick}
      >
        Wróć
      </button>
      <h2 className="mb-4 text-2xl font-semibold">Szczegóły paragonu</h2>
      <p>Data: {receipt.date}</p>
      <p>Sklep: {receipt.shop}</p>
      <p>Suma: {receipt.total}</p>
      <p>Numer paragonu: {receipt.receiptNumber}</p>
      <p>Kategoria: {receipt.category}</p>
      <p>Opis: {receipt.description}</p>
      {receipt.image && (
        <img
          src={receipt.image}
          alt="Full receipt"
          className="mt-4 h-auto max-w-full"
        />
      )}
    </div>
  )
}
