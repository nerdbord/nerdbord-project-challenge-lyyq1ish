import React from 'react'
import Scanner from '../components/Scanner/Scanner'

const page = () => {
  return (
    <div className={`w-full bg-[url('/receipt.jpeg')] bg-cover bg-center`}>
      <Scanner />
    </div>
  )
}

export default page
