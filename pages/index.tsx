import axios, { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn, setUserEmail, setUserName } from '@/store/userSlice'
import { useRouter } from 'next/router'
import { getUserInfo } from '../helper/getUserInfo'
import UserInfoHeader from '@/components/UserInfoHeader'
interface User {
  name: string
  email: string
  _id: string
}
export default function Home() {
  const [message, setMessage] = useState('')
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const [friends, setFriends] = useState<User[]>([])

  const getFriends = async () => {
    try {
      const configuration = {
        method: 'get',
        url: 'http://localhost:8000/get-friends',
        withCredentials: true
      }

      const response = await axios(configuration)
      setFriends(response.data)
    } catch (error) {
      // Handle errors - show an error message to the user
      return error
    }
  }

  useEffect(() => {
    const test = async () => {
      const response: any = await getUserInfo()
      if (isAxiosError(response)) {
        dispatch(setIsLoggedIn({ status: false }))
        console.log('not authenticated')
        router.push('/register')
        return
      }

      dispatch(setIsLoggedIn({ status: response.status }))
      dispatch(setUserEmail({ email: response.email }))
      dispatch(setUserName({ name: response.name }))
      return
    }
    if (!user.isLoggedIn) test()
  }, [])
  if (!user.isLoggedIn) return <></>
  return (
    <>
      <UserInfoHeader />
      <button onClick={getFriends}>get</button>
      <br></br>
      {friends.length ? (
        friends.map((f) => {
          return <span style={{ display: 'block' }}>{f.name}</span>
        })
      ) : (
        <></>
      )}
    </>
  )
}
