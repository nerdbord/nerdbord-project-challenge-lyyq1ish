'use client'

import { useState } from 'react'
import styles from './CreateUserForm.module.scss'
import { createUser, CreateUserPayload } from '@/app/actions/userActions'
import { analyzeReceipt } from '@/app/actions/receiptActions'
import Image from 'next/image'

export default function CreateUserForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [result, setResult] = useState('')

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

  const handleImageUpload = async () => {
    try {
      const analysisResult = await analyzeReceipt()
      setResult(analysisResult)
    } catch (error) {
      console.error('Failed to analyze image:', error)
      setResult('Failed to analyze image')
    }
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
        <h2>
          na to wyżej nie zwracaj uwagi w sumie, tylko sprawdzałem tworzenie
          userów. a tutaj niżej jest button do wysłania tego paragonu co widać
          na obrazku. póki co zahardkodowałem stringa tego paragonu. jeszcze nie
          ma opcji wysyłania zdjęć z kamery.
        </h2>
        <Image
          src="https://img12.dmty.pl//uploads/202112/1640607424_mqpjih_600.jpg"
          alt="Sample receipt"
          width={600}
          height={400}
        />
        <button onClick={handleImageUpload} className={styles.submitButton}>
          ANALIZUJ PARAGON
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
