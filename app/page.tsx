'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const sendRequest = async () => {
    try {
      const configuration = {
        method: 'get',
        url: 'http://localhost:8000/auth',
        withCredentials: true
      }

      const response = await axios(configuration)
      setMessage(response.data.message)
      console.log(response)
    } catch (error) {
      // Handle errors - show an error message to the user
      setMessage('You are not autorized')
      console.error('login failed', error)
    }
  }
  useEffect(() => {
    const test = async () => {
      try {
        const response = await fetch('http://localhost:8000')
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    test()
  }, [])
  return (
    <>
      <h1>My next app</h1>
      <button onClick={sendRequest}> press me</button>
      {message}
    </>
  )
}
