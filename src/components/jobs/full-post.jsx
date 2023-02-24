import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Badges from './badges';
import Image from 'next/image';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function FullPost({ selectedJob, screen, handleClick }) {
	return (
		<article
			className={classNames(
				screen === 'mobile'
					? 'block'
					: 'hidden md:px-2 lg:px-4 xl:px-8 md:order-last md:flex md:flex-col',
				'overflow-y-auto sticky top-0 h-screen relative'
			)}
		>
			{/* Profile header */}
			<div>
				{screen === 'mobile' && (
					<div className='absolute top-0 right-0'>
						<button
							type='button'
							className='inline-flex items-center rounded-full border border-transparent p-1 text-gray-600 shadow-sm hover:bg-gray-900'
							onClick={handleClick}
						>
							<span className='sr-only'>Close sidebar</span>
							<XMarkIcon className='h-6 w-6' aria-hidden='true' />
						</button>
					</div>
				)}
				<div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
					{/* {selectedJob?.profileImage && (
						<div className='mt-6 sm:flex sm:items-end sm:space-x-5'>
							<div className='flex'>
								<img
									className='h-24 w-24 rounded-lg ring-4 ring-white sm:h-32 sm:w-32'
									src={selectedJob?.profileImage}
									alt=''
								/>
							</div>
						</div>
					)} */}
					<div className='mt-8 min-w-0 flex-1 block'>
						<Badges tier={selectedJob?.tier} />
						<div className='flex items-center'>
							<h1 className='truncate text-2xl font-bold text-gray-900'>
								{selectedJob?.title}
							</h1>
							{selectedJob?.tier !== '3' && (
								<Image
									src='/star.png'
									alt='star icon'
									width={15}
									height={15}
									className='ml-2'
								/>
							)}
						</div>
						<h2 className='text-gray-500 font-medium text-xl mt-4'>
							{selectedJob?.name}
						</h2>
						{selectedJob?.website && (
							<a
								href={selectedJob.website}
								target='_blank'
								className='text font-medium text-indigo-600 hover:text-indigo-500'
								rel='noopener noreferrer'
							>
								Website
							</a>
						)}
						<div className='flex gap-x-2 mt-2'>
							<MapPinIcon className='h-6 w-6' />
							<p className='ml-2 inline text-gray-500 font-medium'>
								{`${selectedJob?.address}, ${selectedJob?.city}, ${selectedJob?.state}, ${selectedJob?.zip}`}
							</p>
						</div>
						<Link
							href='/jobs/apply'
							className='mt-4 inline-flex justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							<span>Apply</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Job description */}
			<div className='mt-5 border-t border-gray-200 px-4 py-3 sm:px-6 lg:px-8'>
				<dl className='divide-y divide-gray-200'>
					<div className='py-4'>
						<dt className='text-lg font-medium text-gray-500'>Salary</dt>
						<dd className='mt-1 text-gray-900 '>{`${selectedJob?.salary} per ${selectedJob?.interval}`}</dd>
					</div>
					<div className='py-4'>
						<dt className='text-lg font-medium text-gray-500'>Schedule</dt>
						<dd className='mt-1 text-gray-900 '>{selectedJob?.schedule}</dd>
					</div>
					{selectedJob?.benefits && (
						<div className='py-4'>
							<dt className='text-lg font-medium text-gray-500'>Benefits</dt>
							<dd className='mt-1 text-gray-900 '>
								<ul>
									{selectedJob.benefits.map((benefit, i) => (
										<li key={i}>{benefit}</li>
									))}
								</ul>
							</dd>
						</div>
					)}
					<div className='py-4'>
						<dt className='text-lg font-medium text-gray-500'>
							Full Job Description
						</dt>
						<dd className='mt-1 text-gray-900 '>
							<div
								className='prose'
								dangerouslySetInnerHTML={{ __html: selectedJob?.description }}
							/>
						</dd>
						{/* <dd className='mt-1 text-gray-900 '>{selectedJob?.description}</dd> */}
					</div>
				</dl>
			</div>
		</article>
	);
}
