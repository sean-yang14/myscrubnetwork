import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore'
import { db } from '../../../lib/firebase.config'
import { toast } from 'react-toastify'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import MainCard from '@/components/layout/main-card'
import MainLayout from '@/components/layout/main-layout'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Input({label, type, example, value, handleChange, handleSubmit, handleCancel}) {
  return (
    <div className='sm:col-span-2 '>
      <form onSubmit={handleSubmit} className='flex justify-between'>
        <div className='w-56'>
          <label htmlFor={label} className="sr-only">
            {label}
          </label>
          <input
            type={type}
            name={label}
            id={label}
            value={value}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={example}
          />
        </div>
        <div className="ml-4 flex flex-shrink-0 space-x-4 text-sm items-center">
          <button
            type='submit' 
            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
          <span className="text-gray-700 text-lg" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            name={label}
            onClick={handleCancel}
            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function BinaryAnswerInput({label, value, handleChange, handleSubmit, handleCancel}) {
  return (
    <div className='sm:col-span-2 '>
      <form onSubmit={handleSubmit} className='flex justify-between'>
        <div className='w-56'>
          <label htmlFor={label} className="sr-only">
            {label}
          </label>
          <select
            name={label}
            id={label}
            onChange={handleChange}
            value={value}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">-- Select Y / N -- </option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>
        <div className="ml-4 flex flex-shrink-0 space-x-4 text-sm items-center">
          <button
            type='submit' 
            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
          <span className="text-gray-700 text-lg" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            name={label}
            onClick={handleCancel}
            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function SelectInput({label, value, handleChange, handleSubmit, handleCancel}) {
  return ( 
    <div className='sm:col-span-2 '>
      <form onSubmit={handleSubmit} className='flex justify-between'>
        <div className='w-56'>
          <label htmlFor={label} className="sr-only">
            {label}
          </label>
          <select
            name={label}
            id={label}
            onChange={handleChange}
            value={value}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">-- Select Specialty -- </option>
            <option value='general'>General</option>
            <option value='endodontist'>Endodontist</option>
            <option value='orthodontist'>Orthodontist</option>
            <option value='periodontist'>Periodontist</option>
            <option value='Prosthodontist'>Prosthodontist</option>
            <option value='oral_surgeon'>Oral and Maxillofacial Surgeon</option>
            <option value='pediatric'>Pediatric Dentist</option>
          </select>
        </div>
        <div className="ml-4 flex flex-shrink-0 space-x-4 text-sm items-center">
          <button
            type='submit' 
            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
          <span className="text-gray-700 text-lg" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            name={label}
            onClick={handleCancel}
            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Settings() {
  const [open, setOpen] = useState(false)
  const auth = getAuth()
  // const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState({
    name: false,
    email: false,
    specialty: false,
    other_specialty: false,
    owner: false,
    seeking_job: false,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    other_specialty: '',
    owner: '', 
    seeking_job: '', 
  })

  // Section: On load, pull user data from server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const userRef = doc(db, 'users', auth.currentUser.uid)
          const queryDoc = await getDoc(userRef)
          setFormData({
            ...queryDoc.data(),
            id: queryDoc.id
          })
      } catch (error) {
        console.log(error)
        toast.error('Could not retrieve user info')
      }
    }

    fetchUserData()
  }, [])

  const { name, email, specialty, other_specialty, owner, seeking_job } = formData

  const specialtyMapping = (title) => {
    if (typeof title === 'string' && title.length > 0) {
      if (title === 'oral_surgeon') {
        return 'Oral and Maxillofacial Surgeon'
      } else if (title === 'pediatric') {
        return 'Pediatric Dentist' 
      } else {
        return title[0].toUpperCase() + title.substring(1)
      }
    }
  }

  // Section: Handle updating

  // Click updating option
  const handleClick = (e) => {
    setUpdating((prev) => ({
      ...prev,
      [e.target.name]: true
    }))
  }

  // Fill out updating form
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // Submit updates to server
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userRef = doc(db, 'users', auth.currentUser.uid)

    try {
      // Update name if changed
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        await updateDoc(userRef, {
          name,
        })
        setUpdating((prev) => ({
          ...prev,
          name: false
        }))
      }

      // Update specialty if changed
      if (updating.specialty) {
        // Update in firestore
        await updateDoc(userRef, {
          specialty,
        })
        setUpdating((prev) => ({
          ...prev,
          specialty: false
        }))
      }

      // Update other_specialty if changed
      if (updating.other_specialty) {
        // Update in firestore
        await updateDoc(userRef, {
          other_specialty,
        })
        setUpdating((prev) => ({
          ...prev,
          other_specialty: false
        }))
      }

      // Update seeking job if changed
      if (updating.seeking_job) {
        // Update in firestore
        await updateDoc(userRef, {
          seeking_job,
        })
        setUpdating((prev) => ({
          ...prev,
          seeking_job: false
        }))
      }

      // Update practice owner if changed
      if (updating.owner) {
        // Update in firestore
        await updateDoc(userRef, {
          owner,
        })
        setUpdating((prev) => ({
          ...prev,
          owner: false
        }))
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  // Section: Handle cancelling update
  const handleCancel = (e) => {
    setUpdating((prev) => ({
      ...prev,
      [e.target.name]: false
    }))
  }

  // Section: Handle deleting profile
  const handleDelete = () => {
    setOpen(true)
  }
  
  return (
    <>
      <MainCard>
        <main className="flex-1">
          <div className="relative mx-auto max-w-5xl md:px-8 xl:px-0">
            <div className="pt-10 pb-16">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
              </div>
              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-4">
                  {/* Description list with inline editing */}
                  <div className="mt-6 divide-y divide-gray-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                    </div>
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500">Name</dt>
                          {updating.name
                            && <Input label='name' type='text' example={name} value={formData.name} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
                          }
                          {!updating.name &&
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">{name}</span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  name='name'
                                  onClick={handleClick}
                                  type='button'
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          }
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">{email}</span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500">Specialty</dt>
                          {updating.specialty
                            && <SelectInput label='specialty' value={formData.specialty} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
                          }
                          {!updating.specialty && 
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">
                                {specialtyMapping(specialty)}
                              </span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  name='specialty'
                                  onClick={handleClick}
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          }
                        </div>
                        {other_specialty && (
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Specialty</dt>
                            {updating.other_specialty
                              && <Input label='other_specialty' type='text' example={other_specialty} value={formData.other_specialty} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
                            }
                            {!updating.other_specialty 
                              &&
                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span className="flex-grow">
                                  {specialtyMapping(other_specialty)}
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                  <button
                                    name='other_specialty'
                                    onClick={handleClick}
                                    type="button"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            }
                          </div>
                        )}
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500">Practice owner</dt>
                          {updating.owner
                            && <BinaryAnswerInput label='owner' value={formData.owner} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
                          }
                          {!updating.owner &&
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">{owner}</span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  name='owner'
                                  onClick={handleClick}
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          }
                        </div>
                        {owner !== 'Yes' &&
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Looking for a job?</dt>
                            {updating.seeking_job
                              && <BinaryAnswerInput label='seeking_job' value={formData.seeking_job} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
                            }
                            {!updating.seeking_job &&
                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span className="flex-grow">{seeking_job}</span>
                                <span className="ml-4 flex-shrink-0">
                                  <button
                                    name='seeking_job'
                                    onClick={handleClick}
                                    type="button"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            }
                          </div>
                        }
                      </dl>
                    </div>
                  </div>

                  <div className="mt-6 divide-y divide-gray-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Account</h3>
                    </div>
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 grid grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500">Delete account</dt>
                          <dd className="mt-1 flex text-sm text-gray-900 col-span-2 mt-0">
                            <span className="flex-grow"></span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="rounded-md bg-white font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-base sm:text-sm"
                                onClick={handleDelete}
                              >
                                Delete
                              </button>
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainCard>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                        Delete account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-base text-gray-500">
                          Are you sure you want to delete your account? All of your data will be permanently removed
                          from our servers forever. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <Link
                      href='/settings/delete'
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto text-base sm:text-sm"
                    >
                      Delete
                    </Link>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto text-base sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )

}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

Settings.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}