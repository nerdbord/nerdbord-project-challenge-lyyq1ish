import React from 'react'
import Scanner from '../components/Scanner/Scanner'

const page = () => {
  return (
    <div className={` bg-[url('/receipt.jpeg')] bg-cover bg-center`}>
      <Scanner />
    </div>
  )
}

export default page
