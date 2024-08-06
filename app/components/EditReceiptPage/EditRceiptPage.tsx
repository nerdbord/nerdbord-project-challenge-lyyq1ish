'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getReceiptById, updateReceipt } from '@/app/actions/receiptActions'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import TopNavbar from '../TopNavbar/TopNavbar'

interface Receipt {
  id: string
  date: string | null
  shop: string | null
  total: string | null
  receiptNumber: string | null
  category: string | null
  description: string | null
}

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

export default function EditReceipt() {
  const [receipt, setReceipt] = useState<Receipt | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setReceipt((prevReceipt) =>
      prevReceipt ? { ...prevReceipt, [name]: value } : null
    )
  }

  const handleSaveClick = async () => {
    setLoading(true)
    try {
      if (id && receipt) {
        await updateReceipt(id as string, receipt)
        router.push(`/receipt/${id}`)
      }
    } catch (error) {
      console.error('Error updating receipt:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!receipt) {
    return <div>Loading...</div>
  }

  return (
    <div className={`py-8 ${poppins.className} min-h-screen bg-[#fff]`}>
      <TopNavbar position="block" backIconHref={`receipt/${id}`} />
      <h3
        className={`${poppins.className} text-center text-[20px] text-[#383838]`}
      >
        Sprawdź czy dane są poprawne
      </h3>
      <div className="mx-auto mt-4 flex max-w-[364px] flex-col gap-3">
        <div className="flex flex-col">
          <label>Kwota</label>
          <input
            className={`rounded-xl border border-black p-[12px]`}
            type="string"
            name="total"
            value={receipt.total || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Nazwa sklepu</label>
          <input
            className="rounded-xl border border-black p-[12px]"
            type="text"
            name="shop"
            value={receipt.shop || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>Kategoria</label>
          <input
            className="rounded-xl border border-black p-[12px]"
            type="text"
            name="category"
            value={receipt.category || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>Data</label>
          <input
            className="rounded-xl border border-black p-[12px]"
            type="text"
            name="date"
            value={receipt.date || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>Numer paragonu</label>
          <input
            className="rounded-xl border border-black p-[12px]"
            type="text"
            name="receiptNumber"
            value={receipt.receiptNumber || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>Opis</label>
          <textarea
            name="description"
            value={receipt.description || ''}
            className="h-[128px] rounded-xl border border-black p-2"
            onChange={handleInputChange}
            rows={4}
            cols={50}
          />
        </div>
      </div>
      <div className="mx-4 flex flex-col gap-2 py-8">
        <button
          className="w-[100%] rounded-xl border border-[#383838] py-4 text-center"
          onClick={handleSaveClick}
          disabled={loading}
        >
          {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </button>
        <Link
          className="w-[100%] rounded-xl bg-[#3F5FE3] py-4 text-center text-white"
          href={`/receipt/${id}`}
        >
          Anuluj
        </Link>
      </div>
    </div>
  )
}
