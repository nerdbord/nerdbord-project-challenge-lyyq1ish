'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { ExportIcon, FrontArrow } from '../Icons/Icons'
import Papa from 'papaparse'

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
        console.log('Fetched Receipts:', fetchedReceipts)
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

  const exportToCSV = () => {
    const data = filteredReceipts.map((receipt, index) => ({
      'L.P': index + 1,
      Kwota: receipt.total,
      'Nazwa Sklepu': receipt.shop,
      Kategoria: receipt.category,
      Data: receipt.date,
      'Numer paragonu': receipt.receiptNumber,
      Opis: receipt.description,
    }))

    const csv = Papa.unparse(data, { header: true })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'export.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div
        style={{
          boxShadow: '0px 4px 12.3px 0px rgba(0, 0, 0, 0.25)',
        }}
        className="m-4 rounded-xl bg-[#fff] py-4"
      >
        <div
          className={`mb-6 flex items-center justify-around ${poppins.className}`}
        >
          <h4 className="text-[20px]">Moje wydatki</h4>
          <button onClick={exportToCSV} className="text-[14px]">
            <div className="flex items-center gap-1">
              Eksportuj
              <ExportIcon />
            </div>
          </button>
        </div>
        {loading ? (
          <div className="py-4 text-center">Ładowanie...</div>
        ) : filteredReceipts.length === 0 ? (
          <div className="py-4 text-center">Brak paragonów do wyświetlenia</div>
        ) : (
          <ul className="">
            {filteredReceipts
              .sort((a, b) => {
                if (!a.date) return -1
                if (!b.date) return 1
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
              .map((receipt, index) => (
                <li
                  key={receipt.id}
                  className="cursor-pointer"
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
                          <div className="my-1"></div>
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
