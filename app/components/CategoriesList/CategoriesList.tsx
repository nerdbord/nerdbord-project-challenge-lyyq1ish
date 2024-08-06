'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getReceiptsForUser } from '@/app/actions/receiptActions'
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

const RECEIPT_CATEGORIES = [
  { category: 'Spożywcze', icon: faUtensils },
  { category: 'Elektronika', icon: faTv },
  { category: 'Odzież', icon: faTshirt },
  { category: 'Kosmetyki', icon: faPumpSoap },
  { category: 'Dom', icon: faCouch },
  { category: 'Rozrywka', icon: faGamepad },
  { category: 'Jedzenie', icon: faHamburger },
  { category: 'Zdrowie i leki', icon: faPills },
  { category: 'Transport', icon: faBus },
  { category: 'Edukacja', icon: faBook },
  { category: 'Hobby', icon: faPalette },
  { category: 'Inne', icon: faQuestion },
]

const CategoriesList = () => {
  const [categories, setCategories] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { category: string; icon: any }[]
  >([])
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const receipts = await getReceiptsForUser()
        const usedCategories = new Set(
          receipts.map((receipt) => receipt.category)
        )
        const availableCategories = RECEIPT_CATEGORIES.filter((category) =>
          usedCategories.has(category.category)
        )
        setCategories(
          availableCategories.sort((a, b) =>
            a.category.localeCompare(b.category)
          )
        )
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleCategoryClick = (category: string) => {
    router.push(`/categories/${category}`)
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">Kategorie</h1>
      <ul className="flex flex-col justify-center gap-3 space-y-2">
        {categories.map(({ category, icon }) => (
          <li
            key={category}
            className="flex cursor-pointer items-center space-x-3 rounded-xl bg-[#EEEBEB] p-3 text-lg"
            onClick={() => handleCategoryClick(category)}
          >
            <FontAwesomeIcon icon={icon} />
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoriesList
