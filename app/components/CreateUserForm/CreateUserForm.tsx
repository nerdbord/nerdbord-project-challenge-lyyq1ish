'use client'

import { useState } from 'react'
import styles from './CreateUserForm.module.scss'

import { analyzeReceipt, uploadReceipt } from '@/app/actions/receiptActions'

export default function CreateUserForm() {
  const [result, setResult] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

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
      setResult('Please select a file first.')
      return
    }

    try {
      const base64String = await toBase64(selectedFile)
      const receiptId = await uploadReceipt(base64String)
      const analysisResult = await analyzeReceipt(receiptId)
      setResult(analysisResult)
    } catch (error) {
      console.error('Failed to analyze image:', error)
      setResult('Failed to analyze image')
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img src={preview} alt="Preview" className={styles.preview} />
        )}
        <button onClick={handleImageUpload} className={styles.submitButton}>
          WYŚLIJ I ANALIZUJ PARAGON
        </button>
        {result && (
          <div className={styles.result}>
            <h3>WYNIK ANALIZY:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
