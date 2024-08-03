'use client'

import React, { useState, useEffect } from 'react'
import { getTotalSpent } from '@/app/actions/receiptActions'

const CurrentSaldo = () => {
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

  return (
    <h3 className="py-8 text-center text-3xl">
      Saldo: <span>{total !== null ? `${total} zł` : 'Ładowanie...'}</span>
    </h3>
  )
}

export default CurrentSaldo
