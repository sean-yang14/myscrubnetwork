import {useState} from 'react'
import Link from 'next/link'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'


export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleChange = (e) => setEmail(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className='flex justify-center items-baseline font-bold'>
            <h1 className='text-2xl text-indigo-500'>Scrub Network</h1>
            <span className='text-4xl leading-[0] pl-1'>.</span>
					</div>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send reset link
                </button>
              </div>
            </form>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
              </div>
            </div>

            <Link href="/sign-in" className="flex justify-center mt-4 font-medium text-indigo-600 hover:text-indigo-500">
              Go back to sign in <span aria-hidden='true' className='ml-1'>&rarr;</span>
            </Link>

          </div>
        </div>
    </div>
  )
}