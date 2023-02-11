import Link from 'next/link';

export default function Cta() {
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-4xl py-16 px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8'>
				<h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
					<span className='block'>Ready to get started?</span>
					<span className='-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent'>
						Get in touch or create an account.
					</span>
				</h2>
				<div className='mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5'>
					<Link
						href='/sign-up'
						className='flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
					>
						Get Started
					</Link>
				</div>
			</div>
		</div>
	);
}
