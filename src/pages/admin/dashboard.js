import { useState } from 'react'
import { Switch} from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import MainCard from '@/components/main-card'

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
  {label: 'Phone Number', type: 'text', name: 'phone', id: 'phone', placeholder: '847-313-0000', aria: 'practice phone number'},
  {label: 'Email', type: 'email', name: 'email', id: 'email', placeholder: 'info@scrubnetwork.com', aria: 'practice email'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const noneSelected = {
    new: false,
    delete: false,
    rewards: false,
  }

  const [selected, setSelected] = useState({
    ...noneSelected,
    new: true
  })
  
  const tabs = [
    { name: 'New Listing', id: 'new', current: selected.new},
    { name: 'Delete Listing', id: 'delete', current: selected.delete },
    { name: 'Rewards', id: 'rewards', current: selected.rewards },
  ]

  function NewListing() {
    return (
      <>
        <div className="px-4 sm:px-6 md:px-0">
          {/* Description list with inline editing */}
          <div className="mt-10">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">New Listing</h3>
            </div>
            <form action="">
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                {formEntries.map((entry, i) => {
                  return (
                    <div key={i}>
                      <div className="flex justify-between">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          {entry.label}
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type={entry.type}
                          name={entry.name}
                          id={entry.title}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder={entry.placeholder}
                          aria-describedby={entry.aria}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='mt-8'>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 py-2 px-8 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }

  function DeleteListing() {
    return (
      <>
        <div className="px-4 sm:px-6 md:px-0">
          {/* Description list with inline editing */}
          <div className="mt-10">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Delete Listing</h3>
            </div>
            <form action="">
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                {formEntries.map((entry, i) => {
                  return (
                    <div key={i}>
                      <div className="flex justify-between">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          {entry.label}
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type={entry.type}
                          name={entry.name}
                          id={entry.title}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder={entry.placeholder}
                          aria-describedby={entry.aria}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='mt-8'>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 py-2 px-8 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }

  function Rewards() {
    <>
      <div className="mt-10">
        <h1 className='text-lg'>rewards</h1>
      </div>
    </>
  }

  const handleTabSelected = (e) => {
    setSelected(() => ({
      ...noneSelected,
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
                  ? <NewListing />
                  : selected.delete
                    ? <DeleteListing />
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