'use client'
import Link from 'next/link'
import React from 'react'
import { SuccesSavedParagone } from '../Icons/Icons'

const SuccesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h3 className="text-center text-4xl">Paragon dodany</h3>

      <div className="flex h-[296px] w-[361px] items-center justify-center rounded-xl">
        <SuccesSavedParagone />
      </div>

      <div className="flex w-full flex-col gap-3">
        <Link
          className="w-[100%] rounded-xl bg-[#3F5FE3] py-4 text-center text-white"
          onClick={() => {
            window.location.reload()
          }}
          href={'/dashboard'}
        >
          chcę dodać kolejny paragon
        </Link>
        <Link
          className="w-[100%] rounded-xl border border-[#383838] py-4 text-center"
          href={'/homepage'}
        >
          na razie wystarczy
        </Link>
      </div>
    </div>
  )
}

export default SuccesPage
