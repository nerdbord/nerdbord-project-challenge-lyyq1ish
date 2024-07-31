import React from 'react'
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar'
import { SignOutButton, UserProfile } from '@clerk/nextjs'

const profile = () => {
  return (
    <div className="">
      <div className="flex w-full flex-col p-4">
        <UserProfile />
        <SignOutButton>
          <button className="my-2 w-[100%] rounded-lg bg-[#383838] py-4 text-center text-white">
            Wyloguj się
          </button>
        </SignOutButton>
      </div>
      <BottomNavbar />
    </div>
  )
}

export default profile
