export default function FullPost({ selectedJob }) {
	return (
		<article className='overflow-y-auto sticky top-0 h-screen hidden border-r border-gray-200 md:order-last md:flex md:flex-col'>
			{/* Profile header */}
			<div>
				<div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
					{selectedJob?.profileImage && (
						<div className='mt-6 sm:flex sm:items-end sm:space-x-5'>
							<div className='flex'>
								<img
									className='h-24 w-24 rounded-lg ring-4 ring-white sm:h-32 sm:w-32'
									src={selectedJob?.profileImage}
									alt=''
								/>
							</div>
						</div>
					)}
					<div className='mt-8 hidden min-w-0 flex-1 sm:block 2xl:hidden'>
						<h1 className='truncate text-2xl font-bold text-gray-900'>
							{selectedJob?.title}
						</h1>
						<h2 className='text-gray-500 font-medium text-xl'>
							{selectedJob?.name}
						</h2>
						<div>
							<span>icon</span>
							<p className='ml-2 inline text-gray-500 font-medium'>
								{`${selectedJob?.address}, ${selectedJob?.city}, ${selectedJob?.state}, ${selectedJob?.zip}`}
							</p>
						</div>
						<button
							type='button'
							className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
						>
							<span>Apply</span>
						</button>
					</div>
				</div>
			</div>

			{/* Job description */}
			<div className='mt-5 border-t border-gray-200 px-4 py-3 sm:px-6 lg:px-8'>
				<dl className='divide-y divide-gray-200'>
					<div className='py-4'>
						<dt className='text-lg font-medium text-gray-500'>Salary</dt>
						<dd className='mt-1 text-gray-900 '>{`${selectedJob?.salary} per ${selectedJob?.interval}`}</dd>
					</div>
					<div className='py-4'>
						<dt className='text-lg font-medium text-gray-500'>Schedule</dt>
						<dd className='mt-1 text-gray-900 '>{selectedJob?.schedule}</dd>
					</div>
					{selectedJob?.benefits && (
						<div className='py-4'>
							<dt className='text-lg font-medium text-gray-500'>Benefits</dt>
							<dd className='mt-1 text-gray-900 '>
								<ul>
									{selectedJob.benefits.map((benefit, i) => (
										<li key={i}>{benefit}</li>
									))}
								</ul>
							</dd>
						</div>
					)}
					<div className='py-4'>
						<dt className='text-lg font-medium text-gray-500'>
							Full Job Description
						</dt>
						<dd className='mt-1 text-gray-900 '>{selectedJob?.description}</dd>
					</div>
				</dl>
			</div>
		</article>
	);
}
