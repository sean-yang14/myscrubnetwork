import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../../lib/firebase.config'
import OAuth from '@/components/OAuth'

export default function SignUp() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {name, email, password} = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      router.push('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
  }

  return (
    <>
      <div>
        <header>
          <h1>Happy to have you!</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            id="name"
            placeholder='Name'
            value={name}
            onChange={handleChange}
          />
          <input 
            type="email"
            id="email"
            placeholder='Email'
            value={email}
            onChange={handleChange}
          />
          <div>
            <input 
              type={showPassword ? "text" : "password"}
              id='password'
              placeholder='Password'
              value={password}
              onChange={handleChange} 
            />
            <Image 
              src='/visibilityIcon.svg'
              alt='show password'
              onClick={() => setShowPassword((prevState) => !prevState)}
              width={25}
              height={25}
            />    
          </div>
          <Link href='/'>
            Forgot Password
          </Link>

          <div>
            <h2>Sign Up</h2>
            <button>
              button
            </button>
          </div>
        </form>

        <OAuth />

        <Link href='/sign-in'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}