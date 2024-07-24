'use client'
import { useState } from 'react'

const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="flex flex-col gap-1 p-4 text-2xl">
      <input
        type="text"
        placeholder="email"
        className="border-2 border-black p-1"
      />
      <input
        type="text"
        placeholder="login"
        className="border-2 border-black p-1"
      />
      <input
        type="text"
        placeholder="passwod"
        className="border-2 border-black p-1"
      />
    </div>
  )
}

export default Login
