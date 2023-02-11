import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {app} from '../../lib/firebase.config'

export function useAuthStatus() {
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [user, setUser] =useState(null)
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      // MAYBE: do i need to put getApp() in getAuth()
      const auth = getAuth()
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

  return {user, checkingStatus}
}