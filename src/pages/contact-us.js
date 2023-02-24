import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import {useState} from 'react'
import axios from 'axios'
import MainCard from '@/components/settings-card'
import MainLayout from '@/components/main-layout'

export default function Contact() {

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: {
      error: false,
      msg: null
    }
  })

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [validations, setValidations] = useState('')

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: {
          error: false,
          msg: msg
        }
      })
      setInputs({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      document.getElementById('message-max').innerText = `Max. 500 characters`
    } else {
      setStatus({
        info: {
          error: true,
          msg: msg
        }
      })
    }
  }

  const handleOnChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: {error: false, msg: null}
    })
    setValidations('')
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // Validations
    if (inputs.firstName.length === 0 || inputs.lastName.length === 0 || inputs.email.length === 0 || inputs.subject.length === 0 || inputs.message.length === 0) {
      setValidations('All fields except for phone number must be filled out')
      return
    }

    setStatus(prevStatus => ({...prevStatus, submitting: true}))
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/xvongwlz',
      data: inputs
    })
      .then(response => {
        handleServerResponse(true, 'Thank you, your message has been submitted')
      })
      .catch(error => {
        handleServerResponse(false, error.response.data.error)
      })
  }

  function countChars(e) {
    const maxLength = parseInt(e.target.maxLength)
    const msgLength = e.target.value.length
    const charsRemaining = maxLength - msgLength

    if (msgLength === 0) {
      document.getElementById('message-max').innerText = `Max. 500 characters`
    } else {
      document.getElementById('message-max').innerText = `${charsRemaining} characters remaining`
    }
  }

  return (
    <MainCard>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <div className="relative bg-white shadow-xl">
            <h2 className="sr-only">Contact us</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Contact information */}
              <div className="relative overflow-hidden bg-indigo-700 py-10 px-6 sm:px-10 xl:p-12">
                <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width={343}
                    height={388}
                    viewBox="0 0 343 388"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                      fill="url(#linear1)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear1"
                        x1="254.553"
                        y1="107.554"
                        x2="961.66"
                        y2="814.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff" />
                        <stop offset={1} stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
                  aria-hidden="true"
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width={359}
                    height={339}
                    viewBox="0 0 359 339"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                      fill="url(#linear2)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear2"
                        x1="192.553"
                        y1="28.553"
                        x2="899.66"
                        y2="735.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff" />
                        <stop offset={1} stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
                  aria-hidden="true"
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width={160}
                    height={678}
                    viewBox="0 0 160 678"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                      fill="url(#linear3)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear3"
                        x1="192.553"
                        y1="325.553"
                        x2="899.66"
                        y2="1032.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff" />
                        <stop offset={1} stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white">Contact information</h3>
                <dl className="mt-8 space-y-6">
                  <dt>
                    <span className="sr-only">Phone number</span>
                  </dt>
                  <dd className="flex text-base text-indigo-50">
                    <PhoneIcon className="h-6 w-6 flex-shrink-0 text-indigo-200" aria-hidden="true" />
                    <span className="ml-3 text-lg">+1 (917) 960-3082</span>
                  </dd>
                  <dt>
                    <span className="sr-only">Email</span>
                  </dt>
                  <dd className="flex text-base text-indigo-50">
                    <EnvelopeIcon className="h-6 w-6 flex-shrink-0 text-indigo-200" aria-hidden="true" />
                    <span className="ml-3 text-lg">info@scrubnetwork.com</span>
                  </dd>
                </dl>
              </div>

              {/* Contact form */}
              <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                <h3 className="text-xl font-medium text-gray-900">Send us a message</h3>
                <form action="#" onSubmit={handleOnSubmit} method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="firstName" className="block text-lg font-medium text-gray-900">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={inputs.firstName}
                        onChange={handleOnChange}                      
                        autoComplete="given-name"
                        className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-lg font-medium text-gray-900">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={inputs.lastName}
                        onChange={handleOnChange}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-900">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={inputs.email}
                        onChange={handleOnChange}
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label htmlFor="phone" className="block text-lg font-medium text-gray-900">
                        Phone
                      </label>
                      <span id="phone-optional" className="text-lg text-gray-500">
                        Optional
                      </span>
                    </div>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={inputs.phone}
                        onChange={handleOnChange}
                        autoComplete="tel"
                        className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        aria-describedby="phone-optional"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-lg font-medium text-gray-900">
                      Subject
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={inputs.subject}
                        onChange={handleOnChange}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between">
                      <label htmlFor="message" className="block text-lg font-medium text-gray-900">
                        Message
                      </label>
                      <span id="message-max" className="text-lg text-gray-500">
                        Max. 500 characters
                      </span>
                    </div>
                    <div className="mt-1">
                      <textarea
                        name="message"
                        id="message"
                        value={inputs.message}
                        onChange={handleOnChange}
                        onKeyUp={countChars}
                        maxLength='500'
                        rows={4}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        aria-describedby="message-max"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-between">
                    <div>
                      {validations && (
                        <p className='text-red-500 text-lg xs:mb-4'>
                          {validations}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      {!status.submitting 
                        ? !status.submitted
                          ? 'Submit'
                          : 'Submitted'
                        : 'Submitting...'
                      }
                    </button>
                  </div>
                </form>
                {status.info.error && (
                  <p className='text-red-500 text-lg'>
                    Error: {status.info.msg}
                  </p>
                )}
                {!status.info.error && status.info.msg && (
                  <p className='text-lg text-green-500'>{status.info.msg}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainCard>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

Contact.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}
