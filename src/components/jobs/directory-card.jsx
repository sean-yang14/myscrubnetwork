import { XMarkIcon } from '@heroicons/react/24/solid';
import {
	BriefcaseIcon,
	CalendarIcon,
	CheckIcon,
	ChevronDownIcon,
	CurrencyDollarIcon,
	BuildingOfficeIcon,
	LinkIcon,
	MapPinIcon,
	PencilIcon,
	UsersIcon,
} from '@heroicons/react/20/solid';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Tooltip from '../layout/tooltip';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function DirectoryCard({ job, current }) {
	const router = useRouter();

	// Check if user is admin
	const [userData, setUserData] = useState(null);
	const auth = getAuth();
	const [authInitialized, setAuthInitialized] = useState(false);
	const [learnMore, setLearnMore] = useState(false);

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

	const deleteListing = async (id) => {
		try {
			console.log('starting');
			const listingRef = doc(db, 'listings', id);
			console.log(id);
			await deleteDoc(listingRef);
			console.log('done');
			// location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleLearnMore = () => {
		if (learnMore === false) {
			setLearnMore(true);
		} else {
			setLearnMore(false);
		}
	};

	//create formula to convert number to text with a comma as the 1000 separator
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<>
			<div className='overflow-hidden bg-white border-gray-200 border-[1px] shadow rounded-lg  hover:bg-gray-50 mb-6'>
				<div className='grid grid-cols-1 md:grid-cols-3 relative '>
					<div className='absolute top-4 right-4 md:right-6'>
						<Link href={`/jobs/${job?.id}`} className='flex items-center'>
							{/* <p className='text-xs underline mr-4 text-blue-700 decoration-blue-700'>
								link to save or share
							</p> */}
							<ArrowTopRightOnSquareIcon className='h-6 w-6' />
						</Link>
					</div>
					<div className='px-4 sm:px-6 flex flex-col md:col-span-2 my-4 py-2'>
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
									onClick={() => {
										deleteListing(job.id);
									}}
									className='inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
								>
									<XMarkIcon className='h-5 w-5' aria-hidden='true' />
								</button>
							</div>
						)}
						<div className='flex justify-between'>
							{/* Job post content */}
							<div className='flex flex-col gap-y-2'>
								{job.referralBonus && (
									<div className='w-fit inline-flex items-center rounded-md bg-green-100 px-1 py-0.5 font-medium text-green-800'>
										Referral Bonus: ${numberWithCommas(job.referralBonus)}
									</div>
								)}
								<h3 className='text-xl font-bold leading-6 text-gray-900'>
									{job.title}
								</h3>
							</div>
						</div>
						{/* practice name and location */}
						{/* <div className='flex items-center space-x-4 mt-2'>
							<h4 className='text-lg leading-6 text-indigo-700 font-medium'>
								Aspen Dental
							</h4>
							<p className='text-xl'>&#x2022;</p>
							<h4 className='leading-6 text-gray-900'>
								{job.city}, {job.state}
							</h4>

							{job.name && (
								<>
									<h4 className='text-lg leading-6 text-indigo-700 font-medium'>
										{job.name}
									</h4>
									<p className='text-xl'>&#x2022;</p>
								</>
							)}
						</div> */}
						<div className='mt-1 flex flex-col md:mt-0 md:flex-row md:flex-wrap'>
							{job?.name && (
								<div className='mt-2 flex items-center text-indigo-700 font-medium mr-4'>
									<BuildingOfficeIcon
										className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
										aria-hidden='true'
									/>
									{job?.name}
								</div>
							)}
							<div className='mt-2 flex items-center text-indigo-700 font-medium mr-4'>
								<BuildingOfficeIcon
									className='mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-700'
									aria-hidden='true'
								/>
								Aspen Dental
							</div>
							<div className='mt-2 flex items-center text-gray-500 mr-4'>
								<MapPinIcon
									className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
									aria-hidden='true'
								/>
								{job?.city}, {job?.state}
							</div>
							{job?.partner && (
								<div className='mt-2 flex items-center text-gray-500'>
									<UsersIcon
										className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
										aria-hidden='true'
									/>
									Partnered with&nbsp;
									<span className='text-indigo-700 font-medium'>
										{job?.partner}
									</span>
								</div>
							)}
						</div>
					</div>
					<div className='md:col-start-3 flex flex-col space-y-2'>
						<div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center items-center h-full my-4 mx-2 md:my-0 md:mx-0'>
							<button
								type='button'
								className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-fit'
								onClick={handleLearnMore}
							>
								{learnMore ? 'Less Detail' : 'Learn More'}
							</button>
							<Link
								href={`/jobs/apply/${job?.name ? job?.name : 'practice'}/${
									job?.title
								}/${job?.id}`}
								className='w-full sm:w-fit inline-flex justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								<span>Apply</span>
							</Link>
						</div>
					</div>
				</div>
				<div
					className={classNames(
						!learnMore && 'hidden',
						'mb-6 border-[1px] rounded-md mx-2 md:mx-6 divide-y-[1px]'
					)}
				>
					<div className='px-2 md:px-6 py-4'>
						<h1 className='font-medium text-lg text-indigo-700 decoration-2  underline-offset-4 mb-2'>
							Compensation Details
						</h1>
						<div
							className='prose prose-li:leading-none 
							prose-p:mt-0
							prose-p:mb-2
							prose-p:leading-normal
							prose-br:leading-none
							max-w-none'
							dangerouslySetInnerHTML={{ __html: job?.compensationDetails }}
						/>
					</div>
					<div className='px-2 md:px-6 py-4'>
						<h1 className='font-medium mb-2 text-lg text-indigo-700 decoration-2  underline-offset-4'>
							Full Description
						</h1>
						<div
							className='prose prose-p:mt-0
							prose-p:mb-2
							prose-p:leading-normal
							prose-br:leading-none
							max-w-none'
							dangerouslySetInnerHTML={{ __html: job?.fullDescription }}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
