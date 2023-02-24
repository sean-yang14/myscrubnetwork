import {useRouter} from 'next/router'
import { signOut, getAuth } from 'firebase/auth'
import {useEffect} from 'react'
import {app} from '../../lib/firebase.config'

async function logout() {
  // const auth = getAuth(app)
  const auth = getAuth()
  await signOut(auth)
}


export default function Logout() {
  return (
    <button className='border-2 border-red-500 w-full' onClick={logout}>Logout</button>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

