import React from 'react'
import BottomNavbar from '../components/BottomNavbar/BottomNavbar'
import CategoriesList from '../components/CategoriesList/CategoriesList'

const categories = () => {
  return (
    <div>
      <div className="pb-[120px]">
        <CategoriesList />
      </div>
      <BottomNavbar />
    </div>
  )
}

export default categories
