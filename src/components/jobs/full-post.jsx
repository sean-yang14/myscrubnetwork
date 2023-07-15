import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import Badges from './badges';
import Image from 'next/image';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function FullPost({ selectedJob, screen, handleClick }) {
	return (
		<article
			className={classNames(
				screen === 'mobile'
					? 'block flex flex-col'
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
					{/* Profile Image */}
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
					<div className='mt-8 min-w-0 flex-1 block text-left'>
						<div className='flex items-center'>
							<h1 className='truncate text-2xl font-bold text-gray-900'>
								{selectedJob?.title}
							</h1>
							{(selectedJob?.tier === '1' || selectedJob?.tier === '2') && (
								<Image
									src='/star.png'
									alt='star icon'
									width={15}
									height={15}
									className='ml-2'
								/>
							)}
						</div>
						<h2 className='text-indigo-700 font-medium text-xl mt-4'>
							{selectedJob?.name}
						</h2>
						{selectedJob?.website && (
							<a
								href={selectedJob.website}
								target='_blank'
								className='font-medium text-gray-700 hover:text-gray-900'
								rel='noopener noreferrer'
							>
								Website
							</a>
						)}
						<div className='flex items-center gap-x-2 mt-2'>
							<MapPinIcon className='h-5 w-5' />
							<h4 className='leading-6 inline text-gray-900 text-sm sm:text-base'>
								{selectedJob?.address && <span>{selectedJob?.address},</span>}{' '}
								{selectedJob?.city && <span>{selectedJob?.city},</span>}{' '}
								{selectedJob?.state}{' '}
								{selectedJob?.zip && <span>{selectedJob?.zip}</span>}
							</h4>
						</div>
						<Link
							href={`/jobs/apply/${selectedJob?.name}/${selectedJob?.title}/${selectedJob?.id}`}
							className='w-full sm:w-fit mt-4 inline-flex justify-center rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							<span>Apply</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Job description */}
			<div className='mt-5 border-t border-gray-200 px-4 py-3 sm:px-6 lg:px-8 text-left'>
				<dl className='divide-y divide-gray-200'>
					<div className='py-4'>
						<dt className='text-xl font-medium text-gray-900'>Salary</dt>
						{selectedJob?.salary && (
							<dd className='mt-1 text-gray-700 '>{`${selectedJob?.salary} per ${selectedJob?.interval}`}</dd>
						)}
					</div>
					<div className='py-4'>
						<dt className='text-xl font-medium text-gray-900'>Schedule</dt>
						<dd className='mt-1 text-gray-700 '>{selectedJob?.schedule}</dd>
					</div>
					{selectedJob?.benefits && (
						<div className='py-4'>
							<dt className='text-lg font-medium text-gray-500'>Benefits</dt>
							<dd className='mt-1 text-gray-700 '>
								<ul>
									{selectedJob.benefits.map((benefit, i) => (
										<li key={i}>{benefit}</li>
									))}
								</ul>
							</dd>
						</div>
					)}
					<div className='py-4'>
						<dt className='text-xl font-medium text-gray-900'>
							Full job description
						</dt>
						<dd className='mt-1 text-gray-700 '>
							<div
								className='prose'
								dangerouslySetInnerHTML={{ __html: selectedJob?.description }}
							/>
						</dd>
					</div>
				</dl>
			</div>
		</article>
	);
}
