import React from 'react'
import Scanner from '../components/Scanner/Scanner'
import ReceiptList from '../components/ReceiptList/ReceiptList'
import Navbar from '../components/Navbar/Navbar'

const page = () => {
  return (
    <div>
      <Navbar />
      <h2>głowna strona po zalogowaniu sie</h2>
      <Scanner />
      <ReceiptList />
    </div>
  )
}

export default page
