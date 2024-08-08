import React from 'react'

// import ReceiptList from '../components/ReceiptList/ReceiptList'

import BottomNavbar from '../components/BottomNavbar/BottomNavbar'
import CurrentSaldo from '../components/CurrentSaldo/CurrentSaldo'
import MonthlySpendingsDiagram from '../components/MonthlySpendingsDiagram/MonthlySpendingsDiagram'

const page = () => {
  return (
    <>
      <div className="relative bg-[#F6F5FA] pb-[120px]">
        <CurrentSaldo />
        <MonthlySpendingsDiagram />
      </div>
      <BottomNavbar />
    </>
  )
}

export default page
