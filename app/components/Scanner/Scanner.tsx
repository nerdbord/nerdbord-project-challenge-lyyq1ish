'use client'

import { useState } from 'react'
import styles from './Scanner.module.scss'
import {
  analyzeReceipt,
  saveAnalyzedReceipt,
} from '@/app/actions/receiptActions'

interface ReceiptData {
  DATA?: string
  SKLEP?: string
  SUMA?: string
  NUMER_PARAGONU?: string
  KATEGORIA?: string
  OPIS?: string
}

export default function Scanner() {
  const [result, setResult] = useState<ReceiptData | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [sendImage, setSendImage] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setResult({ OPIS: 'Please select a file first.' })
      return
    }

    setLoading(true)
    setSuccessMessage('')

    try {
      const base64String = await toBase64(selectedFile)
      const analysisResult = await analyzeReceipt(base64String)
      setResult(analysisResult)
    } catch (error) {
      console.error('Failed to analyze image:', error)
      setResult({ OPIS: 'Failed to analyze image' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setResult((prevResult) =>
      prevResult ? { ...prevResult, [name]: value } : { [name]: value }
    )
  }

  const handleSaveReceipt = async () => {
    try {
      const savedReceiptId = await saveAnalyzedReceipt({
        ...result,
        image: sendImage ? preview : '',
      })
      console.log('Receipt saved with ID:', savedReceiptId)
      setSuccessMessage('Paragon zapisany pomyślnie!')
    } catch (error) {
      console.error('Failed to save receipt:', error)
      setSuccessMessage('Błąd zapisu paragonu')
    }
  }

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.cameraContainer}>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
        />
        {preview && (
          <div>
            <img src={preview} alt="Preview" className={styles.preview} />
          </div>
        )}
        <button
          onClick={handleImageUpload}
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Analizowanie...' : 'WYŚLIJ I ANALIZUJ PARAGON'}
        </button>
        {loading && <div className={styles.spinner}></div>}
        {result && (
          <div className={styles.result}>
            <h3>WYNIK ANALIZY:</h3>
            <div className={styles.inputGroup}>
              <label>Data:</label>
              <input
                type="text"
                name="DATA"
                value={result.DATA || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Sklep:</label>
              <input
                type="text"
                name="SKLEP"
                value={result.SKLEP || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Suma:</label>
              <input
                type="text"
                name="SUMA"
                value={result.SUMA || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Numer paragonu:</label>
              <input
                type="text"
                name="NUMER_PARAGONU"
                value={result.NUMER_PARAGONU || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Kategoria:</label>
              <input
                type="text"
                name="KATEGORIA"
                value={result.KATEGORIA || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Opis:</label>
              <textarea
                name="OPIS"
                value={result.OPIS || ''}
                onChange={handleInputChange}
                rows={4}
                cols={50}
              />
            </div>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={sendImage}
                  onChange={(e) => setSendImage(e.target.checked)}
                />
                Dołącz obrazek do danych
              </label>
            </div>
            <div className={styles.buttonsGroup}>
              <button onClick={handleSaveReceipt} className={styles.saveButton}>
                ZAPISZ PARAGON
              </button>
            </div>
            {successMessage && (
              <div className={styles.successMessage}>{successMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
