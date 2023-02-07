import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../lib/firebase.config'
import Image from 'next/image'
import { toast } from 'react-toastify'
import MainCard from '@/components/main-card'
import {useRouter} from 'next/router'
import NewListing from '../../../components/admin/new-listing'
import UpdateListing from '../../../components/admin/update-listing'

const formEntries = [
  {label: 'Position Title', type: 'text', name: 'title', id: 'title', placeholder: 'Associate Dentist', aria: 'position title'},
  {label: 'Practice Name', type: 'text', name: 'name', id: 'name', placeholder: 'Aspen Dental', aria: 'practice name'},
  {label: 'Practice Website', type: 'text', name: 'website', id: 'website', placeholder: 'aspendental.com', aria: 'practice website'},
  {label: 'Address', type: 'text', name: 'address', id: 'address', placeholder: '2928 41st Ave', aria: 'practice address'},
  {label: 'City', type: 'text', name: 'city', id: 'city', placeholder: 'Long Island City', aria: 'practice city'},
  {label: 'State', type: 'text', name: 'state', id: 'state', placeholder: 'NY', aria: 'practice state'},
  {label: 'Zip Code', type: 'text', name: 'zip', id: 'zip', placeholder: '11101', aria: 'practice zip code'},
  {label: 'Salary Range', type: 'text', name: 'salary', id: 'salary', placeholder: '$100,000', aria: 'salary range'},
  {label: 'Salary Interval', type: 'text', name: 'interval', id: 'interval', placeholder: 'Year'},
  {label: 'Schedule', type: 'text', name: 'schedule', id: 'schedule', placeholder: 'Full Time', aria: 'dentist schedule'},
  // {label: 'Phone Number', type: 'text', name: 'phone', id: 'phone', placeholder: '847-313-0000', aria: 'practice phone number'},
  // {label: 'Email', type: 'email', name: 'email', id: 'email', placeholder: 'info@scrubnetwork.com', aria: 'practice email'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Rewards() {
  <>
    <div className="mt-10">
      <h1 className='text-lg'>rewards</h1>
    </div>
  </>
}

export default function Dashboard() {
  const router = useRouter()
  const {slug} = router.query

  if (slug?.[0] === 'update') {
    const startingSelection = {
      new: false,
      update: true,
      rewards: false
    }
  } else if (slug?.[0] === 'rewards') {
    const startingSelection = {
      new: false,
      update: false,
      rewards: true
    }
  } else {
    const startingSelection = {
      new: true,
      update: false,
      rewards: false
    }
  }

  const startingSelection = {
    new: true,
    update: false,
    rewards: false
  }

  const [selected, setSelected] = useState({
    ...startingSelection
  })
  
  const tabs = [
    { name: 'New Listing', id: 'new', current: selected.new},
    { name: 'Update Listing', id: 'update', current: selected.update },
    { name: 'Rewards', id: 'rewards', current: selected.rewards },
  ]

  const handleTabSelected = (e) => {
    setSelected(() => ({
      new: false,
      update: false,
      rewards: false,
      [e.target.id]: true
    }))
  }
  

  return (
    <>
      <MainCard>
        <main className="flex-1">
          <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div className="pt-10 pb-16">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="py-6">
                {/* Tabs */}
                <div className="block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          id={tab.id}
                          onClick={handleTabSelected}
                          className={classNames(
                            tab.current
                              ? 'border-purple-500 text-purple-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
                          )}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                {selected.new
                  ? <NewListing formEntries={formEntries}/>
                  : selected.update
                    ? <UpdateListing formEntries={formEntries}/>
                    : selected.rewards
                      ? <Rewards />
                      : <NewListing />
                }
              </div>
            </div>
          </div>
        </main>
      </MainCard>
    </>
  )

}