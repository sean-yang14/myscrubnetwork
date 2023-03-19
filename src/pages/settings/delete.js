import MainCard from '@/components/layout/main-card'
import MainLayout from '@/components/layout/main-layout'
import { CheckIcon } from '@heroicons/react/24/outline';
import { useForm, ValidationError } from '@formspree/react';
import { signOut, getAuth } from 'firebase/auth'
import {Router, useRouter} from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Delete() {
  const [state, handleSubmit] = useForm('myyawdqo');

  const router = useRouter()

  async function logout() {
    const auth = getAuth()
    await signOut(auth)
    router.push('/jobs')
  }

	if (state.succeeded) {
		return (
			<MainCard>
        <div className='flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
            <div>
              <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                <CheckIcon
                  className='h-6 w-6 text-green-600'
                  aria-hidden='true'
                />
              </div>
              <div className='mt-3 text-center sm:mt-5'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Delete Request Submitted
                </h3>
              </div>
            </div>
            <div className='mt-5 sm:mt-6'>
              <button
                onClick={logout}
                className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
			</MainCard>
		);
	}

  return (
    <MainCard>
      <main className='flex-1'>
        <div className="py-8 px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Delete Account</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We&#39;re sorry to see you go. However, as a startup we&#39;d greatly appreciate your feedback on how we can improve.
            </p>
            <p className="mt-2 text-lg leading-8 text-indigo-700 italic">
              Your account will be deleted once our team receives your feedback.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-xl sm:mt-10">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
                <ValidationError
                  prefix='Name'
                  field='name'
                  errors={state.errors}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
                <ValidationError
                  prefix='Email'
                  field='email'
                  errors={state.errors}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                  Reason for leaving
                </label>
                <div className="mt-2.5">
                  <textarea
                    required
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    defaultValue={''}
                  />
                </div>
                <ValidationError
                  prefix='message'
                  field='message'
                  errors={state.errors}
                />
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-base sm:text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </MainCard>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

Delete.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}

