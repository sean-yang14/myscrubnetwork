import { useEffect, useState } from 'react'
import { ChevronLeftIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import DirectoryCard from '@/components/jobs/directory-card'
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
import FullPost from '@/components/full-post'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Jobs() {
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
          <div className='grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-8'>
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
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Search
              </button>
            </form>
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
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Search
              </button>
            </form>
          </div>

          {/* Start of content */}
          <div className="relative z-0 flex flex-1 overflow-hidden mt-4 md:mt-8 md:grid md:grid-cols-2">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
              <article className="h-screen overflow-y-auto xl:border-r xl:border-gray-200 xl:order-first md:flex md:flex-col">
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

            <FullPost selectedJob={selectedJob}/>
          </div>
        </div>
      </div>
    </>
  )
}
