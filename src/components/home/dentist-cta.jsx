import Link from 'next/link';

export default function Cta() {
	return (
		<div className='bg-white mb-12 -mt-4'>
			<div className='mx-auto max-w-4xl py-16 px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8'>
				<h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
					<span className='block'>Ready to get started?</span>
					<span className='-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent'>
						Create an account or reach out to learn more.
					</span>
				</h2>
				<div className='mt-8 sm:mt-6 space-y-4 flex justify-center space-y-0 space-x-8 items-center'>
					<Link
						href='/sign-up'
						className='flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
					>
						Sign up
					</Link>
					<Link
						href='/sign-up'
						className='text-base font-semibold leading-6 text-gray-900'
					>
						Learn more <span aria-hidden='true'>→</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
