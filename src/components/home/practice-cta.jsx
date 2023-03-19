import Link from 'next/link';

export default function PracticeCta() {
	return (
		<div className='bg-white'>
			<div className='py-24 px-6 sm:px-6 sm:py-32 lg:px-8'>
				<div className='mx-auto max-w-2xl text-center'>
					<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
						Are you looking to hire dentists?
						<br />
						Partner with Scrub Network today.
					</h2>
					<p className='mx-auto mt-6 max-w-xl text-xl leading-8 text-gray-600'>
						Contact us to discuss how Scrub Network can help you quickly hire
						high quality dentists.
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link
							href='/contact'
							className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Contact us
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
