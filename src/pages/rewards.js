import {
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Rewards() {

  return (
    <>
      <div>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1 bg-amber-400">
            <div className="py-6">
              <div className='bg-amber-400'>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <h1 className="text-3xl font-semibold text-gray-900">Rewards</h1>
                  <p className="font-medium text-gray-600">Welcome back, Sean</p>
                </div>
                {/* Referral code */}
                <div className='mt-8 px-4 sm:px-6 md:px-8'>
                  <div className="block text-xl font-medium">
                    Referral Code
                  </div>
                  <div className="mt-1 flex rounded-md shadow-sm lg:w-1/2">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <div
                        id='referralCode'
                        className="block border-black border-[1px] w-full rounded-none rounded-l-md pl-4 focus:border-indigo-500 focus:ring-indigo-500 text-lg flex items-center"
                      >
                        RK-6SA-KE
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => navigator.clipboard.writeText(document.querySelector('#referralCode').innerText)}
                      className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-700 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Cash Stats */}
              <div className="mx-auto max-w-7xl px-4 mt-8 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Rewards Balance</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-lg font-medium text-gray-500">Tokens</dt>
                    <div className='flex items-center'>
                      <Image 
                        src='/tokens.png'
                        width={60}
                        height={60}
                        alt='tokens'
                      />
                      <dd className="mt-1 ml-4 text-3xl font-semibold tracking-tight text-gray-900">1000</dd>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-lg font-medium text-gray-500">Cash Earned</dt>
                    <div className='flex items-center'>
                      <Image 
                        src='/money.png'
                        width={50}
                        height={50}
                        alt='cash'
                        className='mt-1'
                      />
                      <dd className="mt-1 ml-4 text-3xl font-semibold tracking-tight text-gray-900">$2000</dd>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-lg font-medium text-gray-500">Potential Referral Bonuses</dt>
                    <div className='flex items-center'>
                      <Image 
                        src='/money-bag.png'
                        width={50}
                        height={50}
                        alt='cash'
                        className='mt-1'
                      />
                      <dd className="mt-1 ml-4 text-3xl font-semibold tracking-tight text-gray-900">$2000</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            <div className="py-6">
              {/* Rewards game */}
              <div className="bg-white border-2 border-red-500">
                <div className="mx-auto max-w-7xl py-4 sm:px-6 sm:py-8 lg:px-8">
                  <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2"
                      aria-hidden="true"
                    >
                      <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                      <defs>
                        <radialGradient
                          id="759c1415-0410-454c-8f7c-9a820de03641"
                          cx={0}
                          cy={0}
                          r={1}
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(512 512) rotate(90) scale(512)"
                        >
                          <stop stopColor="#7775D6" />
                          <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                        </radialGradient>
                      </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Boost your productivity.
                        <br />
                        Start using our app today.
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-300">
                        Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a
                          href="#"
                          className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          Get started
                        </a>
                        <a href="#" className="text-base font-semibold leading-7 text-white">
                          Learn more <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8">
                      <img
                        className="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                        alt="App screenshot"
                        width={1824}
                        height={1080}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </main>
        </div>
      </div>
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

Rewards.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}