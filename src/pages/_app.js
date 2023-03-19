import '@/app/globals.css'
import MainLayout from '@/components/layout/main-layout'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UserContext } from '@/login/user'
import { useEffect, useState, useRef } from 'react'
import {useRouter} from 'next/router'
import {app} from '../../lib/firebase.config'
import '../../node_modules/react-quill/dist/quill.snow.css'

export default function App({ Component, pageProps }) {
  const auth = getAuth(app)
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          console.log(user)
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
    router.push('/sign-in/access')
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

// Can navbar be added to getLayout?
{/* <UserContext.Provider value={user}>
        <MainLayout>
          <Component {...pageProps} />      
        </MainLayout>
      </UserContext.Provider> */}
