import '../app/globals.css'
import MainLayout from '../components/main-layout'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {UserContext} from '../login/user'
import { useEffect, useState, useRef } from 'react'
import {useRouter} from 'next/router'
import {app} from '../../lib/firebase.config'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const isMounted = useRef(true)

    useEffect(() => {
      if (isMounted) {
        const auth = getAuth(app)
        onAuthStateChanged(auth, (user) => {
          console.log(user)
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
      return (
        <MainLayout>
          <div className='w-full'>
            Loading...
          </div>
        </MainLayout>
      )
    }

    if (pageProps.protected && !checkingStatus && !user) {
      router.push('/sign-in')
    }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout((
    <>
      <UserContext.Provider value={user}>
        <Component {...pageProps} />      
      </UserContext.Provider>
    </>
  ))
}

{/* <UserContext.Provider value={user}>
        <MainLayout>
          <Component {...pageProps} />      
        </MainLayout>
      </UserContext.Provider> */}
