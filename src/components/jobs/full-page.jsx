import { Fragment } from 'react';
import Link from 'next/link';
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
import { Menu, Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	addDoc,
	collection,
	serverTimestamp,
	doc,
	getDoc,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import FullPageDescription from './full-page-description';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

//create formula to convert number to text with a comma as the 1000 separator
const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function FullPagePost(post_id) {
	const id = post_id.id;
	const [post, setPost] = useState();

	//copy current page url to clipboard
	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
	};

	// Pull data from server
	useEffect(() => {
		const fetchPostData = async () => {
			try {
				const listingRef = doc(db, 'listings', id);
				const queryDoc = await getDoc(listingRef);
				setPost({
					...queryDoc.data(),
					id: queryDoc.id,
				});
			} catch (error) {
				console.log(error);
			}
		};

		fetchPostData();
	}, [id]);

	return (
		<>
			{/* mt-1 flex flex-col md:mt-0 md:flex-row md:flex-wrap */}
			<div className='my-12 px-6 sm:my-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
				<div className='min-w-0 flex-1'>
					{post?.referralBonus && (
						<>
							<div className='w-fit inline-flex items-center rounded-md bg-green-100 px-1 py-0.5 font-medium text-green-800 mb-4'>
								Referral Bonus: ${numberWithCommas(post.referralBonus)}
							</div>
						</>
					)}
					<h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
						{post?.title}
					</h2>
					<div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
						{post?.name && (
							<div className='mt-2 flex items-center text-gray-500'>
								<BuildingOfficeIcon
									className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
									aria-hidden='true'
								/>
								{post?.name}
							</div>
						)}
						<div className='mt-2 flex items-center text-gray-500'>
							<MapPinIcon
								className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
								aria-hidden='true'
							/>
							{post?.city}, {post?.state}
						</div>
						{post?.partner && (
							<div className='mt-2 flex items-center text-gray-500'>
								<UsersIcon
									className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
									aria-hidden='true'
								/>
								Partnered with{' '}
								<span className='text-indigo-700 text-medium ml-1'>
									{post?.partner}
								</span>
							</div>
						)}
					</div>
				</div>
				<div className='mt-5 flex lg:ml-4 lg:mt-0'>
					<span className='mr-3'>
						<button
							type='button'
							className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
							onClick={copyToClipboard}
						>
							<LinkIcon
								className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
							Copy Link
						</button>
					</span>

					<span className='sm:ml-3'>
						<Link
							href={`/jobs/apply/${post?.name ? post?.name : 'practice'}/${
								post?.title
							}/${post?.id}`}
						>
							<button
								type='button'
								className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								<CheckIcon
									className='-ml-0.5 mr-1.5 h-5 w-5'
									aria-hidden='true'
								/>
								Apply
							</button>
						</Link>
					</span>
				</div>
			</div>
			<FullPageDescription post={post} />
		</>
	);
}
