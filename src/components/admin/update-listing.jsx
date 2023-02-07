import { useState } from 'react';

export default function UpdateListing({ formEntries }) {
	return (
		<>
			<div className='px-4 sm:px-6 md:px-0'>
				{/* Description list with inline editing */}
				<div className='mt-10'>
					<div className='space-y-1'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>
							Update Listing
						</h3>
					</div>
					<form action=''>
						<div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3'>
							{formEntries.map((entry, i) => {
								return (
									<div key={i}>
										<div className='flex justify-between'>
											<label
												htmlFor='title'
												className='block text-sm font-medium text-gray-700'
											>
												{entry.label}
											</label>
										</div>
										<div className='mt-1'>
											<input
												type={entry.type}
												name={entry.name}
												id={entry.title}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												aria-describedby={entry.aria}
											/>
										</div>
									</div>
								);
							})}
						</div>
						<div className='mt-6'>
							<label
								htmlFor='description'
								className='block text-sm font-medium text-gray-700'
							>
								Full Description
							</label>
							<textarea
								className='mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500'
								name='description'
								id='description'
								cols='20'
								rows='5'
							></textarea>
						</div>
						<div className='mt-8'>
							<button
								type='submit'
								className='rounded-md border border-transparent bg-indigo-600 py-2 px-8 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
							>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
