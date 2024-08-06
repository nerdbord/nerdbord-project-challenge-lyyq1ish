'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getReceiptsForUser } from '@/app/actions/receiptActions'
import { Poppins } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUtensils,
  faTv,
  faTshirt,
  faPumpSoap,
  faCouch,
  faGamepad,
  faHamburger,
  faPills,
  faBus,
  faBook,
  faPalette,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons'
import { FrontArrow } from '@/app/components/Icons/Icons'
import TopNavbar from '@/app/components/TopNavbar/TopNavbar'

interface Receipt {
  id: string
  date: string | null
  shop: string | null
  total: string | null
  category: string | null
  receiptNumber: string | null
  description: string | null
}

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CATEGORY_ICONS: { [key: string]: any } = {
  Spożywcze: faUtensils,
  Elektronika: faTv,
  Odzież: faTshirt,
  Kosmetyki: faPumpSoap,
  Dom: faCouch,
  Rozrywka: faGamepad,
  Jedzenie: faHamburger,
  'Zdrowie i leki': faPills,
  Transport: faBus,
  Edukacja: faBook,
  Hobby: faPalette,
  Inne: faQuestion,
}

const CategoryReceipts = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()
  const category = decodeURIComponent(pathname.split('/').pop() || '')

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const allReceipts = await getReceiptsForUser()
        const filteredReceipts = allReceipts.filter(
          (receipt) => receipt.category === category
        )
        setReceipts(filteredReceipts)
      } catch (error) {
        console.error('Error fetching receipts:', error)
      } finally {
        setLoading(false)
      }
    }
    if (category) fetchReceipts()
  }, [category])

  const handleReceiptClick = (receiptId: string) => {
    router.push(`/receipt/${receiptId}`)
  }

  return (
    <div className="p-2">
      <TopNavbar backIconHref="categories" position="block" />
      <div className="m-4 rounded-xl bg-[#EEEBEB] py-4">
        <div
          className={`mb-1 flex items-center justify-around ${poppins.className}`}
        >
          <h4 className="mb-4 text-[20px]">Paragony z kategorii: {category}</h4>
        </div>
        {loading ? (
          <div className="py-4 text-center">Ładowanie...</div>
        ) : receipts.length === 0 ? (
          <div className="py-4 text-center">Brak paragonów do wyświetlenia</div>
        ) : (
          <ul className="space-y-4">
            {receipts.map((receipt) => (
              <li
                key={receipt.id}
                className="cursor-pointer rounded border p-4 hover:bg-gray-100"
                onClick={() => handleReceiptClick(receipt.id)}
              >
                <div className="flex w-full items-center gap-6 p-4">
                  <div className="flex w-12 justify-center">
                    <FontAwesomeIcon
                      icon={CATEGORY_ICONS[receipt.category || 'Inne']}
                      className="text-xl"
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-start">
                      <p className="font-semibold">{receipt.category}</p>
                      <div className="flex flex-col text-[12px]">
                        <p>{receipt.shop}</p>
                        <p>{receipt.date}</p>
                        <div className="my-1">
                          <p>Numer paragonu:</p>
                          <p>{receipt.receiptNumber}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>{receipt.total} zł</p>
                      <FrontArrow />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CategoryReceipts
