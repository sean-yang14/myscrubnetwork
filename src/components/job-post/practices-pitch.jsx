import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function PracticesPitch() {
	return (
		<div className='bg-white py-16 sm:py-20'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 space-y-8 md:space-y-0 md:grid-cols-2 md:gap-x-8 items-start'>
				<div className='mx-auto lg:mx-0 rounded-md ring-1 ring-gray-500  px-8 py-8'>
					<div>
						<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
							For Private Practices
						</h2>
						<p className='mt-6 text-md leading-8 text-gray-600'>
							Posts stay up until the role is filled. We don&#39;t require
							reposting every 30 days like other sites and only charge you once.
						</p>
						<p className='mt-6 text-md leading-8 text-gray-600'>
							If you&#39;re a private practice{' '}
							<span className='italic'>in or near a major city</span>, posting a
							job is{' '}
							<span className='underline decoration-indigo-400 decoration-4 font-bold'>
								FREE
							</span>
							. For other practices, we charge a one-time fee of $50. All
							practices can sponsor a post for greater visibility.
						</p>
						<p className='mt-6 text-md leading-8 text-gray-600'>
							The fee is used to cover basic operating costs and to ensure that
							we can continue to provide a high quality product.
						</p>
						<p className='mt-6 text-md leading-8 text-gray-600'>
							Fill out the form below, and we&#39;ll get your job posted within
							24 hours.
						</p>
					</div>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link
							href='#job-form'
							className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
						>
							Job Form
						</Link>
					</div>
				</div>
				<div className='mx-auto lg:mx-0 rounded-md ring-1 ring-gray-500  px-8 py-8 md:h-full'>
					<div>
						<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
							For DSOs and Recruiters
						</h2>
						<p className='mt-6 text-md leading-8 text-gray-600'>
							We&#39;re providing a better way to source candidates, allowing
							you to scale your operations in a cost effective way.
						</p>
						<p className='mt-6 text-md leading-8 text-gray-600'>
							Scrub Network is different from other job boards. We&#39;re
							specialized in reaching and engaging with dental professionals,
							particularly those eary in their career.
						</p>
						<p className='mt-6 text-md leading-8 text-gray-600'>
							Contact us to learn more about how we can help you fill roles with
							the right candidates, quickly.
						</p>
					</div>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link
							href='/contact-us'
							className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Contact Sales
						</Link>
					</div>
				</div>
			</div>
			<div className='flex justify-center mt-12'>
				<ChevronDoubleDownIcon className='w-10 h-10' />
			</div>
		</div>
	);
}
