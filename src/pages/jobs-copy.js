import { useEffect, useState } from 'react'
import { ChevronLeftIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import DirectoryCard from '@/components/directory-card'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../../firebase.config'
import { toast } from 'react-toastify'

const directory = [
  {
    title: 'Specialist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'General Dentist',
    company: 'Tend',
    location: 'New York, New York',
    address: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.'
  },
  {
    title: 'PEDs',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'Dentist',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
  {
    title: 'End',
    company: 'Tend',
    location: 'New York, New York',
    companyAddress: '1277 Third Ave, New York, New York, 10021',
    compensation: '40,000 a year',
    schedule: 'Part-Time',
    items: [
      'ilumenasd desl',
      'ilumenasd desl',
      'ilumenasd desl',
    ],
    profileImage:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    benefits: [
      '401k',
      'sign on bonus'
    ],
    fullDescription: 'lots of words'
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState(directory[0])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create query
        const q = query(
          listingsRef,
          // orderBy('timeStamp', 'desc'),
          // limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch posts')
      }
    }

    fetchListings()
  }, [])

  // Pagination
  const onFetchMoreListings = async () => {}

  const handleClick = (e) => {
    setSelectedJob(directory[e.currentTarget.id])
  }

  const limit = 3;
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1)
  }

  const totalPages = Math.ceil(directory.length / limit)
  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit
  const jobs = directory.slice(startIndex, endIndex)

  console.log('hi', listings)

  return (
    <>
      <div className="flex h-full md:pl-64">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* Start of content */}
          <div className="relative z-0 flex flex-1 overflow-hidden md:grid md:grid-cols-2">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
              {/* Breadcrumb */}
              <nav className="flex items-start px-4 py-3 sm:px-6 lg:px-8 md:hidden" aria-label="Breadcrumb">
                <a href="#" className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                  <ChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Directory</span>
                </a>
              </nav>

              <article className="h-screen overflow-y-auto xl:border-r xl:border-gray-200 xl:order-first md:flex md:flex-col">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-lg font-medium text-gray-900">Jobs</h2>
                  {/* <p className="mt-1 text-sm text-gray-600">Search directory of 3,018 employees</p> */}
                  <form className="mt-6 flex space-x-4" action="#">
                    <div className="min-w-0 flex-1">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="search"
                          name="search"
                          id="search"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                      <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="sr-only">Search</span>
                    </button>
                  </form>
                </div>
                {/* Job list */}
                <div className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
                  <ul>
                    {/* {jobs.map((job, i) => {
                      return (
                          <li key={i} id={i} onClick={handleClick}>
                            <DirectoryCard job={job}/>
                          </li>
                      )
                    })} */}
                    {listings?.map((listing, i) => {
                      return (
                          <li key={i} id={i} onClick={handleClick}>
                            {/* <DirectoryCard job={listing}/> */}
                            {listing.data.employer}
                          </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Page numbers */}
                <nav
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{endIndex}</span> of{' '}
                      <span className="font-medium">{directory.length}</span> results
                    </p>
                  </div>
                  <div className="flex flex-1 justify-between sm:justify-end">
                    <button
                      onClick={handlePrevClick}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextClick}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={endIndex >= directory.length}
                    >
                      Next
                    </button>
                  </div>
                </nav>
              </article>
            </main>

            <article className="overflow-y-auto sticky top-0 h-screen hidden border-r border-gray-200 md:order-last md:flex md:flex-col">
              {/* Profile header */}
              <div>
                {selectedJob.coverImage && 
                  (
                    <div>
                      <img className="h-32 w-full object-cover lg:h-48" src={selectedJob.coverImage} alt="" />
                    </div>
                  )
                }
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                  {selectedJob.profileImage && 
                    (
                      <div className={classNames(
                        selectedJob.coverImage 
                          ? '-mt-12 sm:-mt-16' 
                          : 'mt-6',
                        "sm:flex sm:items-end sm:space-x-5"
                      )}>
                        <div className="flex">
                          <img
                            className="h-24 w-24 rounded-lg ring-4 ring-white sm:h-32 sm:w-32"
                            src={selectedJob.profileImage}
                            alt=""
                          />
                        </div>
                      </div>
                    )
                  }
                  <div className="mt-8 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                    <h1 className="truncate text-2xl font-bold text-gray-900">{selectedJob.title}</h1>
                    <h2 className='text-gray-500 font-medium text-xl'>
                      {selectedJob.company}
                    </h2>
                    <div>
                      <span>
                        icon
                      </span>
                      <p className='ml-2 inline text-gray-500 font-medium'>
                        {selectedJob.address}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                      <span>Apply</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Job description */}
              <div className="mt-5 border-t border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4">
                    <dt className="text-lg font-medium text-gray-500">Salary</dt>
                    <dd className="mt-1 text-gray-900 ">{selectedJob.compensation}</dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-lg font-medium text-gray-500">Schedule</dt>
                    <dd className="mt-1 text-gray-900 ">{selectedJob.schedule}</dd>
                  </div>
                  {selectedJob.benefits
                    && (
                        <div className="py-4">
                          <dt className="text-lg font-medium text-gray-500">Benefits</dt>
                          <dd className="mt-1 text-gray-900 ">
                            <ul>
                              {selectedJob.benefits.map((benefit, i) => (
                                <li key={i}>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )
                  }
                  <div className="py-4">
                    <dt className="text-lg font-medium text-gray-500">Full Job Description</dt>
                    <dd className="mt-1 text-gray-900 ">{selectedJob.fullDescription}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}
