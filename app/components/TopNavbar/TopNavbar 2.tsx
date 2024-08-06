import React from 'react'
import { BackIcon, XIcon } from '../Icons/Icons'
import Link from 'next/link'

interface Props {
  backIconHref: string
  position: string
}

const TopNavbar = ({ backIconHref, position }: Props) => {
  return (
    <div
      className={`z-10 flex w-full max-w-[400px] items-center justify-between p-2 ${position} top-3`}
    >
      <div className="ml-5">
        {backIconHref.length > 3 && (
          <Link href={`/${backIconHref}`}>
            <BackIcon />
          </Link>
        )}
      </div>
      <div className="mr-5">
        <Link href={'/homepage'}>
          <XIcon />
        </Link>
      </div>
    </div>
  )
}

export default TopNavbar
