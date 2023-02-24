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
  endAt,
  endBefore,
  limitToLast,
  getCountFromServer,
} from 'firebase/firestore'
import {db} from '../../../lib/firebase.config'
import { toast } from 'react-toastify'
import FullPost from '@/components/jobs/full-post'
import MainLayout from '@/components/main-layout'
import ModalJob from '@/components/jobs/job-modal'
import StateDropdown from '@/components/jobs/state-dropdown'
import MainCard from '@/components/settings-card'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Jobs() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState()
  const [open, setOpen] = useState(false);
  const [totalListings, setTotalListings] = useState(null)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [firstFetchedListing, setFirstFetchedListing] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [stateSelected, setStateSelected] = useState({id:1, name: 'All'})

  const postLimit = 5 

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let listingsQuery = null
        let pageNavQuery = null

        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create query
        if (stateSelected.name !== 'All') {
          // Run state specific query
          listingsQuery = query(
            listingsRef,
            limit(postLimit),
            orderBy('tier', 'asc'),
            where('state', '==', stateSelected.name),
          )

          pageNavQuery = query(
            listingsRef,
            orderBy('tier', 'asc'),
            where('state', '==', stateSelected.name),
          )
        } else {
          // create query for all listings
          listingsQuery = query(
            listingsRef,
            limit(postLimit),
            orderBy('tier', 'asc'),
          )

          pageNavQuery = query(
            listingsRef,
            orderBy('tier', 'asc'),
          )
        }
        
        // Execute query
        const querySnap = await getDocs(listingsQuery)
        const countSnap = await getCountFromServer(pageNavQuery)

        setTotalListings(countSnap.data().count)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        const firstVisible = querySnap.docs[0]
        setFirstFetchedListing(firstVisible)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            // id: doc.id,
            // data: doc.data()
            ...doc.data()
          })
        })
        
        setListings(listings)
        setSelectedJob(listings[0])
        if (totalListings === 0) {
          setCurrentPage(0)
        } else {
          setCurrentPage(1)
        }
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch posts')
        console.log(error)
      }
    }
    
    fetchListings()
  }, [stateSelected, totalListings])

  // Pagination
  const handleNextPage = async (e) => {
    try {
      setLoading(true)
      let listingsQuery = null

       // Get reference
      const listingsRef = collection(db, 'listings')

      // Create query
      if (stateSelected.name !== 'All') {
        // Run state specific query
        listingsQuery = query(
          listingsRef,
          limit(postLimit),
          orderBy('tier', 'asc'),
          where('state', '==', stateSelected.name),
          startAfter(lastFetchedListing)
        )
      } else {
        // Create query for all listings
        listingsQuery = query(
          listingsRef,
          limit(postLimit),
          orderBy('tier', 'asc'),
          startAfter(lastFetchedListing)
        )
      }

      // Execute query
      const querySnap = await getDocs(listingsQuery)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const firstVisible = querySnap.docs[0]
      setFirstFetchedListing(firstVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          // id: doc.id,
          // data: doc.data(),
          ...doc.data()
        })
      })

      setListings(listings)
      setSelectedJob(listings[0])
      setLoading(false)
      setCurrentPage(currentPage + 1)
    } catch (error) {
      toast.error('Could not fetch listings')
      console.log(error)
    }
  }

  const handlePrevPage = async (e) => {
    try {
      setLoading(true)
      let listingsQuery = null

       // Get reference
      const listingsRef = collection(db, 'listings')
      
       // Create query
      if (stateSelected !== 'All') {
        // Run state specific query
        listingsQuery = query(
          listingsRef,
          limitToLast(postLimit),
          orderBy('tier', 'asc'),
          where('state', '==', stateSelected.name),
          endBefore(firstFetchedListing),
        )
      } else {
        // Create query for all listings
        listingsQuery = query(
          listingsRef,
          limitToLast(postLimit),
          orderBy('tier', 'asc'),
          endBefore(firstFetchedListing),
        )
      }

      // Execute query
      const querySnap = await getDocs(listingsQuery)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const firstVisible = querySnap.docs[0]
      setFirstFetchedListing(firstVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          // id: doc.id,
          // data: doc.data(),
          ...doc.data()
        })
      })

      setListings(listings)
      setSelectedJob(listings[0])
      setLoading(false)
      setCurrentPage(currentPage - 1)
    } catch (error) {
      toast.error('Could not fetch listings')
      console.log(error)
    }
  }

  const handleClick = (e) => {
    setSelectedJob(listings[e.currentTarget.id])
    setOpen(true)
  }

  const totalPages = Math.ceil(totalListings / postLimit)

	const handleModalClick = (e) => {
		setOpen(false);
	};

  const handleStateChange =  (value) => {
    setStateSelected(value)
    console.log(stateSelected)
  }

  return (
    <>
      <MainCard>
        <ModalJob
          handleClick={handleModalClick} 
          open={open} 
          setOpen={setOpen} 
          selectedJob={selectedJob} 
        />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* State selector */}
          
          <div className="-mt-2 md:mt-4 flex space-x-8 justify-center items-center">
            <StateDropdown selected={stateSelected} handleChange={handleStateChange} />
            {/* <div className="min-w-0 flex-1">
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
            </div> */}
          </div> 

          {/* Start of content */}
          <div className="mx-4 relative z-0 flex flex-1 overflow-hidden mt-4 md:mt-8 md:grid md:grid-cols-2">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
              <article className="h-screen overflow-y-auto xl:order-first md:flex md:flex-col">
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
                  {/* Page numbers */}
                  <nav
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span> pages
                      </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                      <button
                        onClick={handlePrevPage}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </nav>
                </div>
              </article>
            </main>

            <article className='md:px-2 lg:px-4 xl:px-8 overflow-y-auto sticky top-0 h-screen hidden md:order-last md:flex md:flex-col'>
              <FullPost selectedJob={selectedJob}/>
            </article>

          </div>
        </div>
      </MainCard>
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

Jobs.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}
