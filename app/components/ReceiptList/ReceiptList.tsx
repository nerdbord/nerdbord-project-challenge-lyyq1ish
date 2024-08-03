'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getReceiptsForUser } from '@/app/actions/receiptActions'
import Link from 'next/link'
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
import { ExportIcon, FrontArrow } from '../Icons/Icons'

interface Receipt {
  id: string
  date: string | null
  shop: string | null
  total: string | null
  category: string | null
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

export default function ReceiptList() {
  const [, setReceipts] = useState<Receipt[]>([])
  const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchReceipts() {
      try {
        const fetchedReceipts = await getReceiptsForUser()
        setReceipts(fetchedReceipts)
        setFilteredReceipts(fetchedReceipts)
      } catch (error) {
        console.error('Error fetching receipts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReceipts()
  }, [])

  const handleReceiptClick = (receiptId: string) => {
    router.push(`/receipt/${receiptId}`)
  }

  return (
    <>
      <div className="m-4 rounded-xl bg-[#EEEBEB] py-4">
        <div
          className={`mb-1 flex items-center justify-around ${poppins.className}`}
        >
          <h4 className="text-[20px]">Moje wydatki</h4>
          <Link className="text-[14px]" href="/">
            <div className="flex items-center gap-1">
              Eksportuj
              <ExportIcon />
            </div>
          </Link>
        </div>
        {loading ? (
          <div className="py-4 text-center">Ładowanie...</div>
        ) : filteredReceipts.length === 0 ? (
          <div className="py-4 text-center">Brak paragonów do wyświetlenia</div>
        ) : (
          <ul>
            {filteredReceipts.map((receipt, index) => (
              <li
                key={receipt.id}
                className="cursor-pointer"
                onClick={() => handleReceiptClick(receipt.id)}
              >
                <div className="flex w-full items-center gap-6 p-3">
                  <div className="flex w-12 justify-center">
                    <FontAwesomeIcon
                      icon={CATEGORY_ICONS[receipt.category || 'Inne']}
                      className="text-xl"
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-start">
                      <p className="font-semibold">{receipt.category}</p>
                      <div className="flex gap-2 text-[12px]">
                        <p>{receipt.shop}</p>
                        <p>{receipt.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>{receipt.total} zł</p>
                      <FrontArrow />
                    </div>
                  </div>
                </div>
                {index < filteredReceipts.length - 1 && (
                  <hr className="h-[2px] w-full bg-[#DBDBDB]" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
