import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <SignUp />
    </div>
  )
}

export default SignUpPage
