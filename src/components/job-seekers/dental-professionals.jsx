import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function DentalProfessionals() {
	return (
		<div className='bg-white py-16 sm:py-20'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto lg:mx-0'>
					<div>
						<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
							For Dental Professionals
						</h2>
						<p className='mt-6 text-lg leading-8 text-gray-600'>
							Our team helps you find and get hired for the specific job
							you&#39;re looking for.
						</p>
						<p className='mt-6 text-lg leading-8 text-gray-600'>
							Most of our services are free, so don&#39;t hesitate to reach out
							to learn more. To start, simply fill out the form below and
							we&#39;ll be in touch.
						</p>
					</div>
				</div>
				<div className='flex justify-center mt-12'>
					<ChevronDoubleDownIcon className='w-10 h-10' />
				</div>
			</div>
		</div>
	);
}
