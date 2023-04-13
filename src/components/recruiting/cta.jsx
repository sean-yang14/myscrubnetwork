import Link from 'next/link';

export default function CallToAction() {
	return (
		<div className='bg-gray-900'>
			<div className='mx-auto max-w-7xl py-12 px-6 text-center lg:py-16 lg:px-8'>
				<h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
					<span className='block'>Looking to Hire?</span>
					<span className='block'>Let&#39;s Work Together.</span>
				</h2>
				<div className='mt-8 flex justify-center'>
					<div className='inline-flex rounded-md shadow'>
						<Link
							href='/contact-us'
							className='text-lg inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700'
						>
							Let&#39;s Connect
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
