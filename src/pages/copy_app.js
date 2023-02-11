import '../app/globals.css'
import MainLayout from '../components/main-layout'
import {UserContext} from '../components/user'
import {useRouter} from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function App({ Component, pageProps }) {
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [user, setUser] =useState(null)
  const isMounted = useRef(true)

  const router = useRouter()

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        }
        setCheckingStatus(false)
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  if (pageProps.protected && checkingStatus) {
    return <MainLayout>Loading...</MainLayout>
  }

  if (pageProps.protected && !checkingStatus && !user) {
    router.push('/sign-in')
  }

  return (

    <>
      <UserContext.Provider value={user}>
        <MainLayout>
          <Component {...pageProps} />      
        </MainLayout>
      </UserContext.Provider>
    </>
  )
}
