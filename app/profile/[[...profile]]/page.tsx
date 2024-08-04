import React from 'react'
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar'
import { SignOutButton } from '@clerk/nextjs'
import CustomUserProfile from '@/app/components/CustomUserProfile/CustomUserProfile'

const profile = () => {
  return (
    <>
      <div className="min-h-[88vh]">
        <div className="flex w-full flex-col p-4">
          <CustomUserProfile />
          <SignOutButton>
            <button className="my-2 w-[100%] rounded-lg bg-[#383838] py-4 text-center text-white">
              Wyloguj się
            </button>
          </SignOutButton>
        </div>
      </div>
      <BottomNavbar />
    </>
  )
}

export default profile
