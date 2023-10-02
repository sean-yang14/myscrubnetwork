import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

export default function ListingDetails({
	post,
	formEntries,
	handleSubmit,
	handleChange,
	loading,
	fullDescription,
	handleFullDescriptionChange,
	compensationDetails,
	handleCompensationDetailsChange,
	handleConversionChange,
}) {
	return (
		<>
			<div className='px-4 sm:px-6 md:px-0'>
				{/* Description list with inline editing */}
				<div className='mt-10'>
					<div className='space-y-1'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>
							New Listing
						</h3>
					</div>
					<form onSubmit={handleSubmit}>
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
												id={entry.id}
												onChange={handleChange}
												value={post?.[entry.id]}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												placeholder={entry.placeholder}
												aria-describedby={entry.aria}
											/>
										</div>
									</div>
								);
							})}
							<div>
								<div className='flex justify-between'>
									<label
										htmlFor='specialty'
										className='block text-sm font-medium text-gray-700'
									>
										Specialty
									</label>
								</div>
								<div className='mt-1'>
									<select
										required
										name='specialty'
										id='specialty'
										onChange={handleChange}
										value={post?.specialty}
										className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
									>
										<option value=''>-- Select Specialty -- </option>
										<option value='general'>General</option>
										<option value='endodontist'>Endodontist</option>
										<option value='orthodontist'>Orthodontist</option>
										<option value='periodontist'>Periodontist</option>
										<option value='prosthodontist'>Prosthodontist</option>
										<option value='oral_surgeon'>
											Oral and Maxillofacial Surgeon
										</option>
										<option value='pediatric'>Pediatric Dentist</option>
									</select>
								</div>
							</div>
							<div>
								<div className='flex justify-between'>
									<label
										htmlFor='type'
										className='block text-sm font-medium text-gray-700'
									>
										Type of Practice
									</label>
								</div>
								<div className='mt-1'>
									<select
										required
										name='type'
										id='type'
										onChange={handleChange}
										value={post?.type}
										className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
									>
										<option value=''>-- Select Practice Type -- </option>
										<option value='private'>Private</option>
										<option value='dso'>DSO</option>
										<option value='unknown'>Unknown</option>
									</select>
								</div>
							</div>
						</div>
						{/* Enter formatted html from ReactQuill here */}
						<div className='grid grid-cols-2 gap-x-8'>
							<div className='mt-6'>
								<label
									htmlFor='pastedCompDetails'
									className='block text-sm font-medium text-gray-700'
								>
									Paste Formatted Compensation Details
								</label>
								<textArea
									rows='7'
									onChange={handleConversionChange}
									className='block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
									name='pastedCompDetails'
									id='pastedCompDetails'
									value={post?.pastedCompDetails}
								/>
							</div>
							<div className='mt-6'>
								<label
									htmlFor='pastedDescription'
									className='block text-sm font-medium text-gray-700'
								>
									Paste Full Job Description
								</label>
								<textArea
									rows='7'
									onChange={handleConversionChange}
									className='block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
									name='pastedDescription'
									id='pastedDescription'
									value={post?.pastedDescription}
								/>
							</div>
						</div>
						<div className='mt-6 grid grid-cols-2 gap-x-8'>
							<div>
								<label
									htmlFor='compensationDetails'
									className='block text-sm font-medium text-gray-700'
								>
									Compensation Details
								</label>
								<ReactQuill
									id='compensationDetails'
									name='compensationDetails'
									className='mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 h-36 block'
									theme='snow'
									value={compensationDetails}
									onChange={handleCompensationDetailsChange}
									defaultValue={''}
								/>
							</div>
							<div>
								<label
									htmlFor='fullDescription'
									className='block text-sm font-medium text-gray-700'
								>
									Full Description
								</label>
								<ReactQuill
									id='fullDescription'
									name='fullDescription'
									className='mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 h-36'
									theme='snow'
									value={fullDescription}
									onChange={handleFullDescriptionChange}
									defaultValue={''}
								/>
							</div>
						</div>
						<div className='mt-24 lg:mt-16'>
							<button
								type='submit'
								className='rounded-md border border-transparent bg-indigo-600 py-2 px-8 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-base sm:text-sm'
							>
								{loading ? 'Loading...' : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
