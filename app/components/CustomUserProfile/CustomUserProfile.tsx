/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'

const CustomUserProfile = () => {
  const { user, isLoaded } = useUser()

  const [email, setEmail] = useState(
    user?.primaryEmailAddress?.emailAddress || ''
  )
  const [username, setUsername] = useState(user?.username || '')
  const [statusMessage, setStatusMessage] = useState('')

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const handleUpdateProfile = async () => {
    try {
      await user?.update({
        username,
      })
      //@ts-expect-error
      await user?.primaryEmailAddress?.update({
        emailAddress: email,
      })
      setStatusMessage('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      setStatusMessage('Error updating profile')
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="mb-4 text-2xl">Update Profile</h2>
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <button
        onClick={handleUpdateProfile}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Update Profile
      </button>
      {statusMessage && (
        <p className="mt-2 text-sm text-gray-600">{statusMessage}</p>
      )}
    </div>
  )
}

export default CustomUserProfile
