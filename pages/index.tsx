import axios, { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn, setUserEmail, setUserName } from '@/store/userSlice'
import { useRouter } from 'next/router'
import { getUserInfo } from '../helper/getUserInfo'
import { GetServerSideProps } from 'next'
import { redirect } from 'next/navigation'
import UserInfoHeader from '@/components/UserInfoHeader'

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const response = await getUserInfo()
//   if (isAxiosError(response)) {
//     console.log('user not logged in')
//     return {
//       props: {}
//     }
//   }
//   const props = {
//     name: response.name,
//     email: response.email,
//     isLogginIn: true
//   }
//   console.log(props)
//   return {
//     props: props
//   }
// }

export default function Home() {
  const [message, setMessage] = useState('')
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  const sendRequest = async () => {
    try {
      const response = await getUserInfo()
      setMessage(response.message)
      console.log(response)
    } catch (error) {
      // Handle errors - show an error message to the user
      setMessage('You are not autorized')
      console.error('login failed')
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

  return (
    <>
      <UserInfoHeader/>
      {message}
    </>
  )
}
