import React from 'react'
import BottomNavbar from '../components/BottomNavbar/BottomNavbar'
import CategoriesList from '../components/CategoriesList/CategoriesList'

const categories = () => {
  return (
    <div>
      <div className="min-h-[88vh] bg-[#fff]">
        <CategoriesList />
      </div>
      <BottomNavbar />
    </div>
  )
}

export default categories
