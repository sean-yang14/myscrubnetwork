import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronLeftIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/20/solid'
import DirectoryCard from '@/components/directory-card'

const user = {
  name: 'Tom Cook',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Directory', href: '#', icon: MagnifyingGlassCircleIcon, current: true },
  { name: 'Announcements', href: '#', icon: MegaphoneIcon, current: false },
  { name: 'Office Map', href: '#', icon: MapIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Apps', href: '#', icon: SquaresPlusIcon },
  { name: 'Settings', href: '#', icon: CogIcon },
]
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(directory[0])

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



  return (
    <>
      <div className="flex h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-4 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <hr className="my-5 border-t border-gray-200" aria-hidden="true" />
                      <div className="space-y-1 px-2">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img className="inline-block h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500"
                    alt="Your Company"
                  />
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <hr className="my-5 border-t border-gray-200" aria-hidden="true" />
                  <div className="flex-1 space-y-1 px-2">
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <item.icon
                          className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <a href="#" className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <img className="inline-block h-9 w-9 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500"
                  alt="Your Company"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

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
                    {jobs.map((job, i) => {
                      return (
                          <li key={i} id={i} onClick={handleClick}>
                            <DirectoryCard job={job}/>
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
