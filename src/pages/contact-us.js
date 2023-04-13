import { EnvelopeIcon, PhoneIcon, CheckIcon } from '@heroicons/react/24/outline'
import {useState} from 'react'
import axios from 'axios'
import MainCard from '@/components/layout/main-card'
import MainLayout from '@/components/layout/main-layout'

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

  if (status.submitted) {
		return (
			<div className='flex min-h-screen justify-center p-4 text-center items-center p-0'>
				<div className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
					<div>
						<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
							<CheckIcon
								className='h-6 w-6 text-green-600'
								aria-hidden='true'
							/>
						</div>
						<div className='mt-3 text-center sm:mt-5'>
							<h3 className='text-xl font-medium leading-6 text-gray-900'>
								Message Sent
							</h3>
							<div className='mt-2'>
								<p className='text-base text-gray-500'>
									Thank you! We will get back to you as soon as possible.
								</p>
							</div>
						</div>
					</div>
					<div className='mt-5 sm:mt-6'>
						<button
							onClick={() =>
								setStatus((prev) => ({
									...prev,
									submitted: false,
								}))
							}
							className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
						>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	}

  return (
    <MainCard>
      <div>
        <div className='relative mx-auto max-w-5xl md:px-8 xl:px-0'>
          <div className='pt-10 pb-16'>
            <div className='px-4 sm:px-6 md:px-0'>
							<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
								Contact Us
							</h1>
						</div>
            <div className="mx-auto py-12">
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
                    <h3 className="text-lg font-medium text-white">Contact information</h3>
                    <dl className="mt-8 space-y-6">
                      <dt>
                        <span className="sr-only">Phone number</span>
                      </dt>
                      <dd className="flex text-sm text-indigo-50">
                        <PhoneIcon className="h-6 w-6 flex-shrink-0 text-indigo-200" aria-hidden="true" />
                        <span className="ml-3 text-base">+1 (847) 313-0042</span>
                      </dd>
                      <dt>
                        <span className="sr-only">Email</span>
                      </dt>
                      <dd className="flex text-sm text-indigo-50">
                        <EnvelopeIcon className="h-6 w-6 flex-shrink-0 text-indigo-200" aria-hidden="true" />
                        <span className="ml-3 text-base">info@scrubnetwork.com</span>
                      </dd>
                    </dl>
                  </div>

                  {/* Contact form */}
                  <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                    <h3 className="text-lg font-medium text-gray-900">Send us a message</h3>
                    <form action="#" onSubmit={handleOnSubmit} method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
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
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                            Phone
                          </label>
                          <span id="phone-optional" className="text-sm text-gray-500">
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
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
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
                          <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                            Message
                          </label>
                          <span id="message-max" className="text-sm text-gray-500">
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
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2 sm:flex sm:justify-between">
                        <div>
                          {validations && (
                            <p className='text-red-500 text-sm xs:mb-4'>
                              {validations}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainCard>
  )
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
