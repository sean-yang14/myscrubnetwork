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
import { db } from '../../lib/firebase.config'
import { toast } from 'react-toastify'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState()

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
            // id: doc.id,
            // data: doc.data()
            ...doc.data()
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
  // const onFetchMoreListings = async () => {
  //   try {
  //     // Get reference
  //     const listingsRef = collection(db, 'listings')

  //     // Create a query
  //     const q = query(
  //       listingsRef,
  //       limit(3)
  //     )
  //   }
  // }

  const handleClick = (e) => {
    setSelectedJob(listings[e.currentTarget.id])
  }

  const limit = 3;
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1)
  }

  // const totalPages = Math.ceil(directory.length / limit)
  // const startIndex = (currentPage - 1) * limit
  // const endIndex = startIndex + limit
  // const jobs = directory.slice(startIndex, endIndex)

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
                  <span>Listings</span>
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
                <div className="min-h-0 flex-1 overflow-y-auto" aria-label="listings">
                  <ul>
                    {listings?.map((job, i) => {
                      return (
                          <li key={i} id={i} onClick={handleClick}>
                            <DirectoryCard job={job}/>
                          </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Page numbers */}
                {/* <nav
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
                </nav> */}
              </article>
            </main>

            <article className="overflow-y-auto sticky top-0 h-screen hidden border-r border-gray-200 md:order-last md:flex md:flex-col">
              {/* Profile header */}
              <div>
                {selectedJob?.coverImage && 
                  (
                    <div>
                      <img className="h-32 w-full object-cover lg:h-48" src={selectedJob?.coverImage} alt="" />
                    </div>
                  )
                }
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                  {selectedJob?.profileImage && 
                    (
                      <div className={classNames(
                        selectedJob?.coverImage 
                          ? '-mt-12 sm:-mt-16' 
                          : 'mt-6',
                        "sm:flex sm:items-end sm:space-x-5"
                      )}>
                        <div className="flex">
                          <img
                            className="h-24 w-24 rounded-lg ring-4 ring-white sm:h-32 sm:w-32"
                            src={selectedJob?.profileImage}
                            alt=""
                          />
                        </div>
                      </div>
                    )
                  }
                  <div className="mt-8 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                    <h1 className="truncate text-2xl font-bold text-gray-900">{selectedJob?.title}</h1>
                    <h2 className='text-gray-500 font-medium text-xl'>
                      {selectedJob?.name}
                    </h2>
                    <div>
                      <span>
                        icon
                      </span>
                      <p className='ml-2 inline text-gray-500 font-medium'>
                        {`${selectedJob?.address}, ${selectedJob?.city}, ${selectedJob?.state}, ${selectedJob?.zip}`}
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
                    <dd className="mt-1 text-gray-900 ">{`${selectedJob?.salary} per ${selectedJob?.interval}`}</dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-lg font-medium text-gray-500">Schedule</dt>
                    <dd className="mt-1 text-gray-900 ">{selectedJob?.schedule}</dd>
                  </div>
                  {selectedJob?.benefits
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
                    <dd className="mt-1 text-gray-900 ">{selectedJob?.description}</dd>
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
