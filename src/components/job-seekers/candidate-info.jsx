import { useState } from 'react';
import axios from 'axios';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/login/user';

export default function CandidateInfo() {
	// const user = useUser();
	const [validations, setValidations] = useState('');
	const [status, setStatus] = useState({
		submitted: false,
		submitting: false,
		info: {
			error: false,
		},
	});
	const [formData, setFormData] = useState({
		referral: '',
		first_name: '',
		last_name: '',
		email: '',
		location: '',
		phone: '',
		resume: '',
		request: '',
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
				referral: '',
				first_name: '',
				last_name: '',
				email: '',
				location: '',
				phone: '',
				resume: '',
				request: '',
			});
		} else {
			setStatus({
				info: {
					error: true,
				},
			});
			console.log(msg);
		}
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

		// validation for request field
		if (!formData.request) {
			setValidations('Must provide request details');
			return;
		}

		setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

		axios({
			method: 'POST',
			url: 'https://formspree.io/f/xpzgzvwr',
			data: formData,
			headers: {
				'content-type': 'multipart/form-data',
			},
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

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		setFormData((prev) => ({
			...prev,
			resume: droppedFile,
		}));
	};

	const handleFileInputChange = (e) => {
		const selectedFile = e.target.files[0];
		setFormData((prev) => ({
			...prev,
			resume: selectedFile,
		}));
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleCloseClick = (e) => {
		setFormData((prev) => ({
			...prev,
			resume: '',
		}));
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
								Sent!
							</h3>
							<div className='mt-2'>
								<p className='text-base text-gray-500'>
									Thank you for choosing to work with us. We&#39;ll be in touch
									with next steps soon.
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
			<main className='mx-auto max-w-7xl px-6 lg:flex lg:px-8 border-black rounded-md shadow-lg'>
				<div className='w-full'>
					<div className='pt-10 pb-16'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
								Let Us Know How We Can Help
							</h1>
						</div>
						<form
							className='space-y-8 divide-y divide-gray-200 mt-8'
							onSubmit={handleOnSubmit}
						>
							{/* form inputs */}
							<div className='space-y-8 divide-y divide-gray-200'>
								<div>
									<h3 className='text-lg font-medium leading-6 text-gray-900'>
										Add contact information
									</h3>
									<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
										<div className='sm:col-span-3'>
											<label
												htmlFor='first_name'
												className='block text-sm font-medium text-gray-700'
											>
												First name
											</label>
											<div className='mt-1'>
												<input
													required
													type='text'
													name='first_name'
													id='first_name'
													value={formData.first_name}
													onChange={handleChange}
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												/>
											</div>
										</div>

										<div className='sm:col-span-3'>
											<label
												htmlFor='last_name'
												className='block text-sm font-medium text-gray-700'
											>
												Last name
											</label>
											<div className='mt-1'>
												<input
													required
													type='text'
													name='last_name'
													id='last_name'
													value={formData.last_name}
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
												Email address
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
												htmlFor='city'
												className='block text-sm font-medium text-gray-700'
											>
												Current city, state
											</label>
											<div className='mt-1'>
												<input
													type='text'
													name='location'
													id='location'
													value={formData.location}
													onChange={handleChange}
													required
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												/>
											</div>
										</div>

										<div className='sm:col-span-3'>
											<label
												htmlFor='phone'
												className='block text-sm font-medium text-gray-700'
											>
												Phone number (optional)
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
									<h3 className='text-lg font-medium leading-6 text-gray-900'>
										Add a resume
									</h3>

									<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
										<div className='sm:col-span-3'>
											<label
												htmlFor='resume'
												className='block text-sm font-medium text-gray-700'
											>
												Resume
											</label>
											<div
												onDrop={handleDrop}
												onDragOver={handleDragOver}
												className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'
											>
												<div className='space-y-1 text-center'>
													<svg
														className='mx-auto h-12 w-12 text-gray-400'
														stroke='currentColor'
														fill='none'
														viewBox='0 0 48 48'
														aria-hidden='true'
													>
														<path
															d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
															strokeWidth={2}
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
													{formData.resume ? (
														<div className='flex gap-x-2 items-center'>
															<p className='text-indigo-500'>
																{formData.resume.name}
															</p>
															<XMarkIcon
																className='cursor-pointer h-4 w-4 z-10 border-[1px] rounded-full border-gray-700'
																aria-hidden='true'
																onClick={handleCloseClick}
															/>
														</div>
													) : (
														<>
															<div className='flex text-sm text-gray-600'>
																<label className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'>
																	<span>Upload a file</span>
																	<input
																		required
																		id='resume'
																		name='resume'
																		type='file'
																		accept='.docx, .doc, .pdf'
																		className='sr-only'
																		onChange={handleFileInputChange}
																	/>
																</label>
																<p className='pl-1'>or drag and drop</p>
															</div>
															<p className='text-xs text-gray-500'>
																Use a pdf, docx, or doc
															</p>
														</>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='pt-8'>
									<h3 className='text-lg font-medium leading-6 text-gray-900'>
										Add request details
									</h3>
									<div className='mt-6'>
										<div>
											<label
												htmlFor='request'
												className='block text-sm font-medium text-gray-700'
											>
												Request
											</label>
											<div className='mt-1'>
												<textarea
													id='request'
													name='request'
													rows={7}
													value={formData.request}
													onChange={handleChange}
													className='block shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md w-full'
													placeholder='I am looking for...'
													required
												/>
											</div>
										</div>
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
