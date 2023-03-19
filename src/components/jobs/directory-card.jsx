import { XMarkIcon, PencilIcon } from '@heroicons/react/20/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Badges from './badges';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function DirectoryCard({ job }) {
	const router = useRouter();

	// Check if user is admin
	const [userData, setUserData] = useState(null);
	const auth = getAuth();
	const [authInitialized, setAuthInitialized] = useState(false);

	// Section: On load, pull user data from server
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const fetchUserData = async () => {
					try {
						const userRef = doc(db, 'users', auth.currentUser.uid);
						const queryDoc = await getDoc(userRef);
						setUserData({
							...queryDoc.data(),
							id: queryDoc.id,
						});
					} catch (error) {
						console.log(error);
					}
				};

				fetchUserData();
			} else {
				setUserData(null);
			}
			setAuthInitialized(true);
		});

		return () => {
			unsubscribe();
		};
	}, [auth]);

	return (
		<div className='overflow-hidden bg-white border-gray-200 border-[1px] shadow rounded-lg mb-4 lg:mb-6 mr-8 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50'>
			<div className='px-4 py-2 sm:px-6 flex flex-col'>
				{/* Admin Icons */}
				{userData?.admin === 'yes' && (
					<div className='flex gap-x-4 mb-4'>
						<Link
							className='inline-flex items-center rounded-full border border-transparent bg-yellow-400 p-1 text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2'
							href={`admin/dashboard/update/${job.id}`}
						>
							<PencilIcon className='h-5 w-5' aria-hidden='true' />
						</Link>
						<button
							type='button'
							className='inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
						>
							<XMarkIcon className='h-5 w-5' aria-hidden='true' />
						</button>
					</div>
				)}
				<div className='flex justify-between'>
					{/* Job post content */}
					<div className='flex flex-col pt-2 gap-y-2'>
						{(job.tier === '1' || job.tier === '2') && (
							<Badges tier={job.tier} />
						)}
						<div
							className={classNames(
								(job.tier !== '1' || job.tier !== '2') && 'mt-2',
								'flex items-center'
							)}
						>
							<h3 className='text-xl font-bold leading-6 text-gray-900'>
								{job.title}
							</h3>
							{(job.tier === '1' || job.tier === '2') && (
								<Image
									src='/star.png'
									alt='star icon'
									width={15}
									height={15}
									className='ml-2'
								/>
							)}
						</div>
					</div>
				</div>
				<h4 className='text-lg leading-6 text-indigo-700 font-medium mt-4'>
					{job.name}
				</h4>
				<div className='flex items-center gap-x-2 mt-2'>
					<MapPinIcon className='h-4 w-4' />
					<h4 className='leading-6 text-gray-900'>
						{job.address && <span>{job.address},</span>} {job.city}, {job.state}{' '}
						{job.zip && <span>{job.zip}</span>}
					</h4>
				</div>
				<div className='flex gap-x-4 mt-4 mb-4'>
					<span className='w-fit inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 font-medium text-green-800'>
						{`${job.salary} per ${job.interval}`}
					</span>
					<span className='w-fit inline-flex items-center rounded-md bg-orange-100 px-2.5 py-0.5 font-medium text-orange-800'>
						{job.schedule}
					</span>
				</div>
			</div>
			{job.items && (
				<div className='mb-4 px-4 py-5 sm:px-6'>
					<ul>
						{job.items.map((item, i) => {
							return <li key={i}>{item}</li>;
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
