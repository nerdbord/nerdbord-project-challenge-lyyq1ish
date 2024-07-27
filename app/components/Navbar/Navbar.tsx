'use client'
import React from 'react'
import Link from 'next/link'
import { useAuth, UserButton, useClerk } from '@clerk/nextjs'

const Navbar = () => {
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <nav className="mb-5 flex items-center justify-between bg-blue-700 px-6 py-4">
      <div className="flex items-center">
        <Link href="/">
          <div className="test-lg font-bold uppercase text-white">clerk</div>
        </Link>
      </div>
      <div className="text-white">
        {!isSignedIn ? (
          <>
            <Link
              href="/sign-in"
              className="mr-4 text-gray-300 hover:text-white"
            >
              Zaloguj się
            </Link>
            <Link
              href="/sign-up"
              className="mr-4 text-gray-300 hover:text-white"
            >
              Zarejestruj się
            </Link>
          </>
        ) : (
          <div className="mx-auto flex items-center">
            <UserButton />
            <button
              onClick={handleSignOut}
              className="ml-4 text-gray-300 hover:text-white"
            >
              Wyloguj się
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
