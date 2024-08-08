import React from 'react'
import BottomNavbar from '../components/BottomNavbar/BottomNavbar'
import CurrentSaldo from '../components/CurrentSaldo/CurrentSaldo'
import ReceiptList from '../components/ReceiptList/ReceiptList'

const spendings = () => {
  return (
    <>
      <div className="bg-[#F6F5FA] pb-[120px]">
        <CurrentSaldo />
        <ReceiptList />
      </div>

      <BottomNavbar />
    </>
  )
}

export default spendings
