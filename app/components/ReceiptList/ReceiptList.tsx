'use client'

import { useState, useEffect } from 'react'
import {
  getReceiptsForUser,
  getReceiptById,
} from '@/app/actions/receiptActions'
import styles from './ReceiptList.module.scss'

interface Receipt {
  id: string
  image: string | null
  date: string | null
  shop: string | null
  total: string | null
  receiptNumber: string | null
  category: string | null
  description: string | null
}

export default function ReceiptList() {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)

  useEffect(() => {
    async function fetchReceipts() {
      try {
        const fetchedReceipts = await getReceiptsForUser()
        setReceipts(fetchedReceipts)
      } catch (error) {
        console.error('Error fetching receipts:', error)
      }
    }
    fetchReceipts()
  }, [])

  const handleReceiptClick = async (receiptId: string) => {
    try {
      const receipt = await getReceiptById(receiptId)
      setSelectedReceipt(receipt)
    } catch (error) {
      console.error('Error fetching receipt details:', error)
    }
  }

  const handleCloseClick = () => {
    setSelectedReceipt(null)
  }

  return (
    <div className={styles.receiptListContainer}>
      <div className={styles.receiptGrid}>
        {receipts.map((receipt, index) => (
          <div
            key={receipt.id}
            className={styles.receiptSquare}
            onClick={() => handleReceiptClick(receipt.id)}
          >
            <span className={styles.receiptNumber}>{index + 1}</span>
            {receipt.image && (
              <img src={receipt.image} alt="Receipt thumbnail" />
            )}
          </div>
        ))}
      </div>
      {selectedReceipt && (
        <div className={styles.receiptDetails}>
          <button className={styles.closeButton} onClick={handleCloseClick}>
            &times;
          </button>
          <h2>Szczegóły paragonu</h2>
          <p>Data: {selectedReceipt.date}</p>
          <p>Sklep: {selectedReceipt.shop}</p>
          <p>Suma: {selectedReceipt.total}</p>
          <p>Numer paragonu: {selectedReceipt.receiptNumber}</p>
          <p>Kategoria: {selectedReceipt.category}</p>
          <p>Opis: {selectedReceipt.description}</p>
          {selectedReceipt.image && (
            <img src={selectedReceipt.image} alt="Full receipt" />
          )}
        </div>
      )}
    </div>
  )
}
