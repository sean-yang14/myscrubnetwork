import Link from 'next/link';

export default function Recruiting() {
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-7xl pt-20 pb-14 px-6 sm:pt-24 sm:pb-16 lg:px-8'>
				<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
					Want to find a specific candidate quickly?
					<br />
					We offer affordable, personalized recruiting services
				</h2>
				<div className='mt-10 flex items-center gap-x-6'>
					<Link
						href='/recruiting'
						className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Learn more
					</Link>
					{/* <a href='#' className='text-sm font-semibold leading-6 text-gray-900'>
						Learn more <span aria-hidden='true'>→</span>
					</a> */}
				</div>
			</div>
		</div>
	);
}
