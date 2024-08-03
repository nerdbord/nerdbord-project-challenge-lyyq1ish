import React from 'react'
import BottomNavbar from '../components/BottomNavbar/BottomNavbar'
import CurrentSaldo from '../components/CurrentSaldo/CurrentSaldo'
import ReceiptList from '../components/ReceiptList/ReceiptList'

const spendings = () => {
  return (
    <div className="bg-[#fff]">
      <CurrentSaldo />
      <ReceiptList />
      <BottomNavbar />
    </div>
  )
}

export default spendings
