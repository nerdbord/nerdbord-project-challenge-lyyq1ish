'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import {
  Categories,
  PlusIcon,
  Profile,
  Spendings,
  StatsIcons,
} from '../Icons/Icons'

const BottomNavbar = () => {
  const pathname = usePathname()

  return (
    <div className="">
      <ul className="flex items-center justify-between self-stretch bg-[#FFF] p-3 pb-4 text-[12px]">
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/homepage' ? 'border-b-2 border-[#3F5FE3] bg-[#fff]' : ''}`}
            href="/homepage"
          >
            <StatsIcons />
            <p>Statystyki</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/spendings' ? 'border-b-2 border-[#3F5FE3] bg-[#fff]' : ''}`}
            href="/spendings"
          >
            <Spendings />
            <p>Wydatki</p>
          </Link>
        </li>
        <li className="">
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/dashboard' ? 'border-b-2 border-[#3F5FE3] bg-[#fff]' : ''}`}
            href="/dashboard"
          >
            <PlusIcon />
            <p>Dodaj paragon</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/profile' ? 'border-b-2 border-[#3F5FE3] bg-[#fff]' : ''}`}
            href="/profile"
          >
            <Profile />
            <p>Profil</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/categories' ? 'border-b-2 border-[#3F5FE3] bg-[#fff]' : ''}`}
            href="/categories"
          >
            <Categories />
            <p>Kategorie</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default BottomNavbar
