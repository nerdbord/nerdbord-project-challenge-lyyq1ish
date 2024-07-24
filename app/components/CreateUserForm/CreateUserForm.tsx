'use client'

import { useState } from 'react'
import styles from './CreateUserForm.module.scss'
import { createUser, CreateUserPayload } from '@/app/actions/userActions'

export default function CreateUserForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

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
    </div>
  )
}
