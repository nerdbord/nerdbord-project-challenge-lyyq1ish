'use client'
import React, { useEffect, useState } from 'react'
import MonthlySpendingsDiagram from '../MonthlySpendingsDiagram/MonthlySpendingsDiagram'
import CurrentSaldo from '../CurrentSaldo/CurrentSaldo'
import { getTotalSpent } from '@/app/actions/receiptActions'
import NoReceiptState from './NoReceiptState'

const Homepage = () => {
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    async function fetchTotal() {
      try {
        const totalSpent = await getTotalSpent()
        setTotal(totalSpent)
      } catch (error) {
        console.error('Error fetching total spent:', error)
      }
    }
    fetchTotal()
  }, [])

  if (total === null) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        .
      </div>
    )
  }
  if (total === 0) {
    return (
      <div>
        <NoReceiptState />
      </div>
    )
  }

  return (
    <div>
      <CurrentSaldo />
      <MonthlySpendingsDiagram />
    </div>
  )
}

export default Homepage
