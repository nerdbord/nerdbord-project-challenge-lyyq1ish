'use client'

import { useState } from 'react'
import styles from './CreateUserForm.module.scss'
import { createUser, CreateUserPayload } from '@/app/actions/userActions'
import { analyzeReceipt, uploadReceipt } from '@/app/actions/receiptActions'

export default function CreateUserForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [result, setResult] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsError(false)

    try {
      const userData: CreateUserPayload = { email, password }
      const user = await createUser(userData)
      setMessage(`User created successfully: ${user.email}`)
      setEmail('')
      setPassword('')
    } catch (error) {
      setMessage('Failed to create user')
      setIsError(true)
    }
  }

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
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create User
        </button>
      </form>
      {message && (
        <div
          className={`${styles.message} ${isError ? styles.error : styles.success}`}
        >
          {message}
        </div>
      )}
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
