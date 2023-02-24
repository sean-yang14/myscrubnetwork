import Link from 'next/link'
import { Fragment, useState } from 'react'
import { signOut, getAuth } from 'firebase/auth'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  TrophyIcon,
  ChartBarIcon,
  PhoneIcon,
  KeyIcon,
  Cog6ToothIcon,
  BriefcaseIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import {useRouter} from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const noCurrent = {
    jobs: false,
    apply: false,
    rewards: false,
    settings: false,
    contact: false,
    admin: false,
    logout: false,
  }
  
  const [current, setCurrent] = useState({
    noCurrent
  })

  const navigation = [
    { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon, current: current.jobs, id: 'jobs' },
    { name: 'Apply', href: '/apply', icon: PaperAirplaneIcon, current: current.apply, id: 'apply' },
    { name: 'Rewards', href: '/rewards', icon: TrophyIcon, current: current.rewards, id: 'rewards' },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: current.settings, id: 'settings' },
    { name: 'Contact Us', href: '/contact-us', icon: PhoneIcon, current: current.contact, id: 'contact' },
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: KeyIcon, current: current.admin, id: 'admin' },
  ]

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleClick = (e) => {
    setCurrent({
      ...noCurrent,
      [e.target.id]: true
    })
  }
  
  const router = useRouter()

  const handleLogout = async (e) => {
    setCurrent({
      ...noCurrent,
      [e.target.id]: true
    })
    const auth = getAuth()
    await signOut(auth)
    router.push('/sign-in')  
  }

  return (
    <>
      <div>
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
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
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
                    <Link href='/jobs'>
                      <div className="flex flex-shrink-0 items-center px-4">
                        <h1 className='text-xl text-indigo-500 font-bold'>Scrub Network</h1>
                        <span className='text-2xl font-bold leading-[0] pl-1'>.</span>
                      </div>
                    </Link>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          id={item.id}
                          key={item.name}
                          onClick={handleClick}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-indigo-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                      {/* small screen logout */}
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          current.logout
                            ? 'bg-indigo-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <ArrowRightOnRectangleIcon
                          className={classNames(
                            current.logout ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        Logout
                      </button>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <Link href='/jobs'>
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className='text-xl text-indigo-500 font-bold'>Scrub Network</h1>
                  <span className='text-2xl font-bold leading-[0] pl-1'>.</span>
                </div>
              </Link>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {navigation.map((item) => (
                  <Link
                    id={item.id}
                    key={item.name}
                    onClick={handleClick}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-indigo-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          {/* medium screen logout */}
          <button
            onClick={handleLogout}
            className={classNames(
              current.logout
                ? 'bg-indigo-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-2 py-5 text-base font-medium rounded-md border border-gray-20'
            )}
          >
            <ArrowRightOnRectangleIcon
              className={classNames(
                current.logout ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                'mr-4 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}