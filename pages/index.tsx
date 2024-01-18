import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn } from '@/store/userSlice'
import { useRouter } from 'next/router'

export default function Home() {
  const [message, setMessage] = useState('')
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()


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
        const configuration = {
          method: 'get',
          url: 'http://localhost:8000/auth',
          withCredentials: true
        }

        const response = await axios(configuration)
        setMessage(response.data.message)
        console.log(response)
        dispatch(setIsLoggedIn({ status: response.data.status }))
      } catch (err) {
        console.log(err)
        dispatch(setIsLoggedIn({ status: false }))
        router.push('/register')
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
