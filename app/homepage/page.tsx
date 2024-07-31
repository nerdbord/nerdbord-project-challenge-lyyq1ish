import React from 'react'
import Spendings from '../components/Spendings/Spendings'
// import ReceiptList from '../components/ReceiptList/ReceiptList'
import MonthlySpendings from '../components/MonthySpendings/MonthlySpendings'
import BottomNavbar from '../components/BottomNavbar/BottomNavbar'

const page = () => {
  return (
    <div className="bg-[#fff]">
      <Spendings />
      <MonthlySpendings />
      {/* <ReceiptList /> */}
      <BottomNavbar />
    </div>
  )
}

export default page
