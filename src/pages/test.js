import MainCard from '@/components/settings-card'
import MainLayout from '@/components/main-layout'
import { CheckIcon } from '@heroicons/react/24/outline';
import { useForm, ValidationError } from '@formspree/react';
import { signOut, getAuth } from 'firebase/auth'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Delete() {
  const [state, handleSubmit] = useForm('myyawdqo');

  async function logout() {
    const auth = getAuth()
    await signOut(auth)
  }

	
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

