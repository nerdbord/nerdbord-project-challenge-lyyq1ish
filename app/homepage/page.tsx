import React from 'react'

// import ReceiptList from '../components/ReceiptList/ReceiptList'

import BottomNavbar from '../components/BottomNavbar/BottomNavbar'
import CurrentSaldo from '../components/CurrentSaldo/CurrentSaldo'

const page = () => {
  return (
    <div className="bg-[#fff]">
      <CurrentSaldo />
      <BottomNavbar />
    </div>
  )
}

export default page
