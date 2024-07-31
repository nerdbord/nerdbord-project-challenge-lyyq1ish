import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <SignIn />
    </div>
  )
}

export default SignInPage
