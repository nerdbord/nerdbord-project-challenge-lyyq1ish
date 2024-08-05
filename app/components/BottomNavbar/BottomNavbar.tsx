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
      <ul className="flex items-center justify-between self-stretch bg-[#EEEBEB] p-3 pb-4 text-[12px]">
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/homepage' ? 'rounded-lg bg-[#fff]' : ''}`}
            href="/homepage"
          >
            <StatsIcons />
            <p>Statystyki</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/spendings' ? 'rounded-lg bg-[#fff]' : ''}`}
            href="/spendings"
          >
            <Spendings />
            <p>Wydatki</p>
          </Link>
        </li>
        <li className="">
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/dashboard' ? 'rounded-lg bg-[#fff]' : ''}`}
            href="/dashboard"
          >
            <PlusIcon />
            <p>Dodaj paragon</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/profile' ? 'rounded-lg bg-[#fff]' : ''}`}
            href="/profile"
          >
            <Profile />
            <p>Profil</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 py-1 ${pathname === '/categories' ? 'rounded-lg bg-[#fff]' : ''}`}
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
