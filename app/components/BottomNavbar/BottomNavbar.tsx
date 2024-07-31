'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Categories, HomeIcon, PlusIcon, Profile, Spendings } from '../Icons'

const BottomNavbar = () => {
  const pathname = usePathname()

  return (
    <div className="">
      <ul className="flex items-center justify-between self-stretch bg-[#EEEBEB] p-3 pb-4 text-[12px]">
        <li>
          <Link
            className={`flex flex-col items-center px-2 ${pathname === '/homepage' ? 'rounded-lg bg-[#fff]' : ''}`}
            href="/homepage"
          >
            <HomeIcon />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 ${pathname === '/spendings' ? 'text-blue-500' : ''}`}
            href="/spendings"
          >
            <Spendings />
            <p>Wydatki</p>
          </Link>
        </li>
        <li className="">
          <Link
            className={`flex flex-col items-center px-2 ${pathname === '/dashboard' ? 'text-blue-500' : ''}`}
            href="/dashboard"
          >
            <PlusIcon />
            <p>Dodaj paragon</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 ${pathname === '/profile' ? 'text-blue-500' : ''}`}
            href="/profile"
          >
            <Profile />
            <p>Profil</p>
          </Link>
        </li>
        <li>
          <Link
            className={`flex flex-col items-center px-2 ${pathname === '/categories' ? 'text-blue-500' : ''}`}
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
