import { useState } from 'react';
import axios from 'axios';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/login/user';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

export default function Listing({ formEntries }) {
	const [validations, setValidations] = useState('');
	const [status, setStatus] = useState({
		submitted: false,
		submitting: false,
		info: {
			error: false,
		},
	});
	const [description, setDescription] = useState('');
	const handleDescriptionChange = (text) => {
		setDescription(text);
		setValidations('');
	};

	const newEntry = {
		practice_name: '',
		contact_name: '',
		email: '',
		phone: '',
		title: '',
		website: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		salary: '',
		interval: '',
		schedule: '',
		price: '',
		bid: '',
		weeks: '',
		listOfApplicants: false,
	};

	const [formData, setFormData] = useState({
		...newEntry,
	});

	const handleServerResponse = (ok, msg) => {
		if (ok) {
			setStatus({
				submitted: true,
				submitting: false,
				info: {
					error: false,
				},
			});
			setFormData({
				...newEntry,
			});
			setDescription('');
		} else {
			setStatus({
				info: {
					error: true,
				},
			});
			console.log(msg);
		}
	};

	const handleCheckbox = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: !formData.listOfApplicants,
		}));
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		setStatus({
			submitted: false,
			submitting: false,
			info: { error: false, msg: null },
		});
		setValidations('');
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		// Validations
		if (!description || description.length < 15) {
			setValidations('Must be more than 15 characters');
			return;
		}

		setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

		const formDataCopy = {
			...formData,
			description,
		};

		axios({
			method: 'POST',
			url: 'https://formspree.io/f/meqwzaqw',
			data: formDataCopy,
		})
			.then((response) => {
				handleServerResponse(
					true,
					'Thank you, your message has been submitted'
				);
			})
			.catch((error) => {
				handleServerResponse(false, error.response.data.error);
			});
	};

	if (status.submitted) {
		return (
			<div className='flex min-h-screen justify-center p-4 text-center items-center p-0'>
				<div className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
					<div>
						<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
							<CheckIcon
								className='h-6 w-6 text-green-600'
								aria-hidden='true'
							/>
						</div>
						<div className='mt-3 text-center sm:mt-5'>
							<h3 className='text-xl font-medium leading-6 text-gray-900'>
								Job Post Sent
							</h3>
							<div className='mt-2'>
								<p className='text-base text-gray-500'>
									Thank you for using Scrub Network. We&#39;ll notify you when
									your job post has been listed.
								</p>
								<p className='mt-4 text-base text-gray-500'>
									If you have any questions or feedback, please reach out via
									the contact page.
								</p>
							</div>
						</div>
					</div>
					<div className='mt-5 sm:mt-6'>
						<button
							onClick={() =>
								setStatus((prev) => ({
									...prev,
									submitted: false,
								}))
							}
							className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
						>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<main className='flex-1'>
				<div className='relative mx-auto max-w-5xl md:px-8 xl:px-0'>
					<div className='pt-10 pb-16'>
						<div className='px-4 sm:px-6 md:px-0'>
							<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
								Job Post
							</h1>
						</div>
						<form
							className='space-y-8 divide-y divide-gray-200 mt-4'
							onSubmit={handleOnSubmit}
						>
							{/* form inputs */}
							<div className='space-y-8 divide-y divide-gray-200'>
								<div className='pt-8'>
									<h3 className='text-lg font-medium leading-6 text-gray-900'>
										Add contact information
									</h3>
									<p className='text-base leading-6 text-gray-900'>
										Contact information will not be shared with candidates
										unless added to the job post below.
									</p>
									<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
										<div className='sm:col-span-3'>
											<label
												htmlFor='practice_name'
												className='block text-sm font-medium text-gray-700'
											>
												Practice Name
											</label>
											<div className='mt-1'>
												<input
													required
													type='text'
													name='practice_name'
													id='practice_name'
													value={formData.practice_name}
													onChange={handleChange}
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												/>
											</div>
										</div>

										<div className='sm:col-span-3'>
											<label
												htmlFor='contact_name'
												className='block text-sm font-medium text-gray-700'
											>
												Contact Person&#39;s Name
											</label>
											<div className='mt-1'>
												<input
													required
													type='text'
													name='contact_name'
													id='contact_name'
													value={formData.contact_name}
													onChange={handleChange}
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												/>
											</div>
										</div>

										<div className='sm:col-span-3'>
											<label
												htmlFor='email'
												className='block text-sm font-medium text-gray-700'
											>
												Email
											</label>
											<div className='mt-1'>
												<input
													required
													id='email'
													name='email'
													type='email'
													value={formData.email}
													onChange={handleChange}
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												/>
											</div>
										</div>

										<div className='sm:col-span-3'>
											<label
												htmlFor='phone'
												className='block text-sm font-medium text-gray-700'
											>
												Phone Number (optional)
											</label>
											<div className='mt-1'>
												<input
													type='text'
													name='phone'
													id='phone'
													value={formData.phone}
													onChange={handleChange}
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												/>
											</div>
										</div>
									</div>
								</div>

								<div className='pt-8'>
									<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
										<div className='sm:col-span-3'>
											<h3 className='text-lg font-medium leading-6 text-gray-900'>
												Add referral bonus (strongly recommended)
											</h3>
											<p className='text-base leading-6 text-gray-900'>
												A referral bonus significantly increases the chance of
												getting applicants.
											</p>
											<div className='mt-4'>
												<label
													htmlFor='price'
													className='block text-sm font-medium leading-6 text-gray-900'
												>
													Price
												</label>
												<div className='relative mt-1 rounded-md shadow-sm'>
													<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
														<span className='text-gray-500 sm:text-sm'>$</span>
													</div>
													<input
														type='text'
														name='price'
														id='price'
														value={formData.price}
														onChange={handleChange}
														className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
														placeholder='500'
														aria-describedby='price-currency'
													/>
												</div>
											</div>
										</div>
										<div className='sm:col-span-3'>
											<h3 className='text-lg font-medium leading-6 text-gray-900'>
												Sponsor post
											</h3>
											<p className='text-base leading-6 text-gray-900'>
												Have your job sit at the top of the search results.
												Sponsored posts are placed in order of the highest bid
												to lowest.
											</p>
											<div className='mt-4'>
												<div className='flex space-x-4'>
													<div className='w-1/2'>
														<label
															htmlFor='bid'
															className='block text-sm font-medium leading-6 text-gray-900'
														>
															Bid
														</label>
														<div className='relative mt-1 rounded-md shadow-sm'>
															<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
																<span className='text-gray-500 sm:text-sm'>
																	$
																</span>
															</div>
															<input
																type='text'
																name='bid'
																id='bid'
																value={formData.bid}
																onChange={handleChange}
																className='block w-full  rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																placeholder='Starting bid $25'
																aria-describedby='sponsor-bid'
															/>
														</div>
													</div>
													<div className='w-1/2'>
														<label
															htmlFor='weeks'
															className='block text-sm font-medium leading-6 text-gray-900'
														>
															Weeks
														</label>
														<div className='relative mt-1 rounded-md shadow-sm'>
															<input
																type='text'
																name='weeks'
																id='weeks'
																value={formData.weeks}
																onChange={handleChange}
																className='block w-full  rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																placeholder='4'
																aria-describedby='sponsor-weeks'
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='sm:col-span-3'>
											<h3 className='text-lg font-medium leading-6 text-gray-900'>
												Fill Open Roles Fast. I Want an Active Search
											</h3>
											<p className='text-base leading-6 text-gray-900'>
												We actively work our network, putting boots on the
												ground, to find you qualified dentists that want to work
												at your practice.
											</p>
											<div className='mt-4'>
												<fieldset>
													<legend className='sr-only'>Instagram</legend>
													<div className='space-y-5'>
														<div className='relative flex items-start'>
															<div className='flex h-6 items-center'>
																<input
																	id='instagram'
																	aria-describedby='instagram-offering-option'
																	name='instagram'
																	type='checkbox'
																	value={true}
																	onChange={handleCheckbox}
																	// checked={formData.instagram}
																	className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
																/>
															</div>
															<div className='ml-3 text-sm leading-6'>
																<label
																	htmlFor='instagram'
																	className='font-medium text-gray-900'
																>
																	Yes, I want an Instagram Post
																</label>
																{/* <p
																	id='comments-description'
																	className='text-gray-500'
																>
																	Get notified when someones posts a comment on
																	a posting.
																</p> */}
															</div>
														</div>
													</div>
												</fieldset>
											</div>
										</div>
									</div>
								</div>

								<div className='pt-8'>
									<h3 className='text-lg font-medium leading-6 text-gray-900'>
										Add Post Information
									</h3>
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
															required
															type={entry.type}
															name={entry.name}
															id={entry.id}
															onChange={handleChange}
															value={formData[entry.id]}
															className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
															placeholder={entry.placeholder}
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
										{validations && (
											<h4 className='mt-1 mb-2 text-sm text leading-6 text-red-500'>
												{`Error: ${validations}`}
											</h4>
										)}
										<ReactQuill
											id='description'
											name='description'
											className='mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500'
											theme='snow'
											value={description}
											onChange={handleDescriptionChange}
											defaultValue={''}
										/>
									</div>
								</div>
							</div>

							{/* buttons */}
							<div className='pt-5'>
								<div className='flex justify-end'>
									<button
										type='submit'
										className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
