import MainCard from '@/components/settings-card'
import MainLayout from '@/components/main-layout'
import {useRouter} from 'next/router'
import { CheckIcon } from '@heroicons/react/24/outline';
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../../../lib/firebase.config'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import {useState} from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CompleteProfile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    specialty: '',
    other_specialty: '',
    seeking_job: ''
  })

  const router = useRouter()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formCopy = {
      ...formData,
    }

    const userRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userRef, {
      ...formCopy
    })
    router.push('/jobs')
  } 

  return (
    <MainCard>
      <div className="bg-white py-12 px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Complete Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl sm:mt-14">
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Specialty
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <select
                  required
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">-- Select specialty -- </option>
                  <option value='general'>General</option>
                  <option value='endodontist'>Endodontist</option>
                  <option value='orthodontist'>Orthodontist</option>
                  <option value='periodontist'>Periodontist</option>
                  <option value='Prosthodontist'>Prosthodontist</option>
                  <option value='oral_surgeon'>Oral and Maxillofacial Surgeon</option>
                  <option value='pediatric'>Pediatric Dentist</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="other" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Other specialty (if applicable)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="other_specialty"
                  id="other_specialty"
                  value={formData.other}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="seeking_job" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Actively seeking a job?
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <select
                  required
                  id="seeking_job"
                  name="seeking_job"
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">-- Select -- </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Practice Owner
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <select
                  required
                  id="owner"
                  name="owner"
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">-- Select -- </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
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

CompleteProfile.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}

