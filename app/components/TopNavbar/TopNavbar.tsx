import React from 'react'
import { BackIcon, XIcon } from '../Icons/Icons'
import Link from 'next/link'

interface Props {
  backIconHref: string
  position: string
  refresh?: boolean
}

const TopNavbar = ({ backIconHref, position, refresh = false }: Props) => {
  return (
    <div
      className={`z-10 flex w-full max-w-[393px] items-center justify-between p-4 ${position} top-6`}
    >
      <div className="ml-5">
        {backIconHref.length > 3 && (
          <Link
            onClick={(e) => {
              if (refresh) {
                e.preventDefault()
                window.location.reload()
              }
            }}
            href={`/${backIconHref}`}
          >
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
