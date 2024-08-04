'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getReceiptById, deleteReceipt } from '@/app/actions/receiptActions'
import TopNavbar from '../TopNavbar/TopNavbar'
import Link from 'next/link'
import { Poppins } from 'next/font/google'

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

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

export default function SingleReceipt() {
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

  const handleDeleteClick = async () => {
    setLoading(true)
    try {
      if (id) {
        await deleteReceipt(id as string)
        router.push('/spendings')
      }
    } catch (error) {
      console.error('Error deleting receipt:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!receipt) {
    return <div>Loading...</div>
  }

  return (
    <div className={`py-8 ${poppins.className}`}>
      <TopNavbar position="block" backIconHref="nu" />
      <div className="relative m-4 rounded-xl bg-[#EEEBEB] p-4 text-[12px]">
        <Link
          href={`/editreceipt/${id}`}
          className="absolute right-0 p-[10px] text-[#8E8E8E]"
        >
          Edytuj
        </Link>
        <div className="p-2 text-[#8E8E8E]">
          <p>Kwota</p>
          <p className="text-[18px] text-[#383838]">{receipt.total} zł</p>
        </div>
        <hr className="h-[2px] bg-[#DBDBDB]" />
        <div className="p-2 text-[#8E8E8E]">
          <p>Nazwa sklepu</p>
          <p className="text-[18px] text-[#383838]">{receipt.shop}</p>
        </div>
        <hr className="h-[2px] bg-[#DBDBDB]" />
        <div className="p-2 text-[#8E8E8E]">
          <p>Kategoria</p>
          <p className="text-[18px] text-[#383838]">{receipt.category}</p>
        </div>
        <hr className="h-[2px] bg-[#DBDBDB]" />
        <div className="p-2 text-[#8E8E8E]">
          <p>Data</p>
          <p className="text-[18px] text-[#383838]">{receipt.date}</p>
        </div>
        <hr className="h-[2px] bg-[#DBDBDB]" />
        <div className="p-2 text-[#8E8E8E]">
          <p>Numer paragonu</p>
          <p className="text-[18px] text-[#383838]">{receipt.receiptNumber}</p>
        </div>
        <hr className="h-[2px] bg-[#DBDBDB]" />
        <div className="p-2 text-[#8E8E8E]">
          <p>Opis</p>
          <p className="text-[18px] text-[#383838]">{receipt.description}</p>
        </div>
      </div>
      <div className="m-4 rounded-xl bg-[#EEEBEB] p-4">
        <p>Zdjęcie</p>
        {receipt.image && (
          <img
            src={receipt.image}
            alt="Full receipt"
            className="mt-4 h-auto max-w-full"
          />
        )}
      </div>
      <div className="mx-4 flex flex-col gap-2 pb-8">
        <button
          className="w-[100%] rounded-xl border border-[#383838] py-4 text-center"
          onClick={handleDeleteClick}
          disabled={loading}
        >
          {loading ? 'Usuwanie...' : 'Usuń paragon'}
        </button>
        <div className="flex w-full flex-col gap-3">
          <Link
            className="w-[100%] rounded-xl bg-[#383838] py-4 text-center text-white"
            href={'/spendings'}
          >
            Wróć do listy wydatków
          </Link>
        </div>
      </div>
    </div>
  )
}
