import React from 'react'

// import ReceiptList from '../components/ReceiptList/ReceiptList'

import BottomNavbar from '../components/BottomNavbar/BottomNavbar'
import CurrentSaldo from '../components/CurrentSaldo/CurrentSaldo'

const page = () => {
  return (
    <>
      <div className="min-h-[88vh] bg-[#fff]">
        <CurrentSaldo />
      </div>
      <BottomNavbar />
    </>
  )
}

export default page
