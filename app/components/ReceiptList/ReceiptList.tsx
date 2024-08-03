'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getReceiptsForUser } from '@/app/actions/receiptActions'
import Link from 'next/link'
import { Poppins } from 'next/font/google'

interface Receipt {
  id: string
  date: string | null
  shop: string | null
  total: string | null
  category: string | null
}

const poppins = Poppins({ weight: '300', subsets: ['latin'] })

export default function ReceiptList() {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchReceipts() {
      try {
        const fetchedReceipts = await getReceiptsForUser()
        setReceipts(fetchedReceipts)
      } catch (error) {
        console.error('Error fetching receipts:', error)
      }
    }
    fetchReceipts()
  }, [])

  const handleReceiptClick = (receiptId: string) => {
    router.push(`/receipt/${receiptId}`)
  }

  return (
    <div className="m-4 rounded-xl bg-[#EEEBEB] p-2">
      <div className={`flex items-center justify-around ${poppins.className}`}>
        <h4 className="text-[28px]">Moje wydatki:</h4>
        <Link className="text-[14px]" href="/">
          Eksportuj
        </Link>
      </div>
      <ul className="space-y-4">
        {receipts.map((receipt) => (
          <li
            key={receipt.id}
            className="cursor-pointer rounded border p-4 hover:bg-gray-100"
            onClick={() => handleReceiptClick(receipt.id)}
          >
            <p className="font-semibold">{receipt.category}</p>
            <p> {receipt.shop}</p>
            <p> {receipt.date}</p>
            <p> {receipt.total}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
