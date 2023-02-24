import { XMarkIcon, PencilIcon } from '@heroicons/react/20/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Badges from './badges';
import Image from 'next/image';

export default function DirectoryCard({ job }) {
	const router = useRouter();

	return (
		<div className='overflow-hidden bg-white border-gray-200 border-[1px] shadow rounded-lg mb-4 lg:mb-6 mr-8 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50'>
			<div className='px-4 py-5 sm:px-6 flex flex-col'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-y-2'>
						<Badges tier={job.tier} />
						<div className='flex items-center'>
							<h3 className='text-xl font-bold leading-6 text-gray-900'>
								{job.title}
							</h3>
							{job.tier !== '3' && (
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
					{/* Admin Icons */}
					{/* <div className='flex gap-x-4'>
						<Link
							// type='button'
							className='inline-flex items-center rounded-full border border-transparent bg-yellow-600 p-1 text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
							// onClick={() => router.push(`admin/dashboard/update/${job.id}`)}
							href={`admin/dashboard/update/${job.name}`}
						>
							<PencilIcon className='h-5 w-5' aria-hidden='true' />
						</Link>
						<button
							type='button'
							className='inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
						>
							<XMarkIcon className='h-5 w-5' aria-hidden='true' />
						</button>
					</div> */}
				</div>
				<h4 className='text-lg leading-6 text-gray-900 mt-4'>{job.name}</h4>
				<div className='flex gap-x-2 mt-2'>
					<MapPinIcon className='h-5 w-5' />
					<h4 className='text leading-6 text-gray-900'>{`${job.address}, ${job.city}, ${job.state}, ${job.zip}`}</h4>
				</div>
				<div className='flex gap-x-4 mt-4 mb-4'>
					<span className='w-fit inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 font-medium text-green-800'>
						{`${job.salary} per ${job.interval}`}
					</span>
					<span className='w-fit inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 font-medium text-green-800'>
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
