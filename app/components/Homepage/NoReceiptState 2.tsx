import React from 'react'
import { BlackLogoParagraph } from '../Icons/Icons'
import { EmptyReceiptStateIcon } from '../Icons/LargerImages'
import Link from 'next/link'

const NoReceiptState = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-4 pt-[128px]">
      <div className="">
        <BlackLogoParagraph />
      </div>
      <p className="text-xl">
        AI błyskawicznie zeskanuje Twój paragon i automatycznie zapisze wydatek.
        Szybko, łatwo i bez wysiłku śledź swoje finanse dzięki mocy sztucznej
        inteligencji.
      </p>
      <EmptyReceiptStateIcon />
      <Link className="button-blue" href={'/dashboard'}>
        Zeskanuj paragon
      </Link>
    </div>
  )
}

export default NoReceiptState
