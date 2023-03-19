import Link from 'next/link';

export default function CallToAction() {
	return (
		<div className='bg-indigo-700'>
			<div className='py-12 px-6 sm:px-6 sm:py-20 lg:px-8'>
				<div className='mx-auto max-w-2xl text-center'>
					<h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
						Post a Job Today.
					</h2>
					{/* <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur
            commodo do ea.
          </p> */}
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link
							href='/job-post'
							className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
