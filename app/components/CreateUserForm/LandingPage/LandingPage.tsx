'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  const { isSignedIn } = useAuth()
  return (
    <main className="main">
      <h1>tu bedzie landing page i przycisk do logowania</h1>
      {!isSignedIn && (
        <Link className="" href="/sign-in">
          <button className="rounded-lg bg-gray-200 p-2">Zaloguj się</button>
        </Link>
      )}
    </main>
  )
}

export default LandingPage
