import { useState } from 'react';
import axios from 'axios';
import { useForm, ValidationError } from '@formspree/react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import MainCard from '@/components/settings-card';
import Link from 'next/link';

export default function Application({ external }) {
	const [validations, setValidations] = useState('');
	const [status, setStatus] = useState({
		submitted: false,
		submitting: false,
		info: {
			error: false,
		},
	});
	const [formData, setFormData] = useState({
		link: '',
		referral: '',
		first_name: '',
		last_name: '',
		email: '',
		location: '',
		phone: '',
		resume: '',
		commute: '',
		authorization: '',
		licensed: '',
		date: '',
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
				link: '',
				referral: '',
				first_name: '',
				last_name: '',
				email: '',
				location: '',
				phone: '',
				resume: '',
				commute: '',
				authorization: '',
				licensed: '',
				date: '',
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

		// check if questions from employer have been filled out
		if (!formData.commute || !formData.authorization || !formData.licensed) {
			setValidations('All questions from the employer must be answered');
			return;
		}

		setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

		axios({
			method: 'POST',
			url: 'https://formspree.io/f/xqkoqbll',
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
		console.log(formData.resume);
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
		console.log(formData.resume);
	};

	if (status.submitted) {
		return (
			<div className='flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0'>
				<div className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
					<div>
						<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
							<CheckIcon
								className='h-6 w-6 text-green-600'
								aria-hidden='true'
							/>
						</div>
						<div className='mt-3 text-center sm:mt-5'>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>
								Application Sent
							</h3>
							<div className='mt-2'>
								<p className='text-sm text-gray-500'>
									Thank you for using Scrub Network. You will automatically be
									entered into all eligible rewards.
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
							className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
						>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='w-11/12 mx-auto my-8'>
			<div className='md:flex md:items-center md:justify-between'>
				<div className='min-w-0 flex-1'>
					<h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
						Application Form
					</h2>
				</div>
			</div>

			<form
				className='space-y-8 divide-y divide-gray-200 mt-8'
				onSubmit={handleOnSubmit}
			>
				{/* form inputs */}
				<div className='space-y-8 divide-y divide-gray-200'>
					{external && (
						<div>
							<h3 className='text-xl font-medium leading-6 text-gray-900'>
								Add link to external job post
							</h3>
							<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
								<div className='sm:col-span-3'>
									<label
										htmlFor='link'
										className='block text-sm font-medium text-gray-700'
									>
										Link
									</label>
									<div className='mt-1'>
										<input
											type='text'
											name='link'
											id='link'
											value={formData.link}
											onChange={handleChange}
											required
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>
							</div>
						</div>
					)}
					<div className={external && 'pt-8'}>
						<h3 className='text-xl font-medium leading-6 text-gray-900'>
							Add referral information
						</h3>
						<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
							<div className='sm:col-span-3'>
								<label
									htmlFor='referral'
									className='block text-sm font-medium text-gray-700'
								>
									Referrer&#39;s Email
								</label>
								<div className='mt-1'>
									<input
										type='email'
										name='referral'
										id='referral'
										value={formData.referral}
										onChange={handleChange}
										required
										className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='pt-8'>
						<h3 className='text-xl font-medium leading-6 text-gray-900'>
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
									City, State (optional)
								</label>
								<div className='mt-1'>
									<input
										type='text'
										name='location'
										id='location'
										value={formData.location}
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
						<h3 className='text-xl font-medium leading-6 text-gray-900'>
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

					{/* Checkboxes */}
					<div className='pt-8'>
						<div>
							<h3 className='text-xl font-medium leading-6 text-gray-900'>
								Questions from the employer
							</h3>
							{validations && (
								<h4 className='mt-4 text leading-6 text-red-500'>
									{`Error: ${validations}`}
								</h4>
							)}
						</div>
						<div className='mt-6'>
							<fieldset>
								<legend className='sr-only'>commute question</legend>
								<div
									className='text-base font-medium text-gray-900'
									aria-hidden='true'
								>
									Will you be able to reliably commute to this job?
								</div>
								<div className='mt-4 space-y-4'>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='yes_commute'
												name='commute'
												value='yes'
												type='checkbox'
												onChange={handleChange}
												checked={formData.commute === 'yes'}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='yes_commute'
												className='font-medium text-gray-700'
											>
												Yes, I can make the commute
											</label>
										</div>
									</div>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='yes_relocate'
												name='commute'
												value='relocate'
												type='checkbox'
												onChange={handleChange}
												checked={formData.commute === 'relocate'}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='yes_relocate'
												className='font-medium text-gray-700'
											>
												Yes, I am planning to relocate
											</label>
										</div>
									</div>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='no_commute'
												name='commute'
												value='no'
												type='checkbox'
												onChange={handleChange}
												checked={formData.commute === 'no'}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='no_commute'
												className='font-medium text-gray-700'
											>
												No
											</label>
										</div>
									</div>
								</div>
							</fieldset>
							<fieldset>
								<legend className='sr-only'>authorization question</legend>
								<div
									className='text-base font-medium text-gray-900 mt-4'
									aria-hidden='true'
								>
									Are you authorized to work in the United States?
								</div>
								<div className='mt-4 space-y-4'>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='yes_authorized'
												name='authorization'
												value='yes'
												type='checkbox'
												onChange={handleChange}
												checked={formData.authorization === 'yes'}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='yes_authorized'
												className='font-medium text-gray-700'
											>
												Yes
											</label>
										</div>
									</div>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='no_authorized'
												name='authorization'
												value='no'
												type='checkbox'
												onChange={handleChange}
												checked={formData.authorization === 'no'}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='no_authorized'
												className='font-medium text-gray-700'
											>
												No
											</label>
										</div>
									</div>
								</div>
							</fieldset>
							<fieldset>
								<legend className='sr-only'>licensed question</legend>
								<div
									className='text-base font-medium text-gray-900 mt-4'
									aria-hidden='true'
								>
									Do you have a valid dental license in the state?
								</div>
								<div className='mt-4 space-y-4'>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='yes_licensed'
												name='licensed'
												value='yes'
												type='checkbox'
												onChange={handleChange}
												checked={formData.licensed === 'yes'}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='yes_licensed'
												className='font-medium text-gray-700'
											>
												Yes
											</label>
										</div>
									</div>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='future_licensed'
												name='licensed'
												value='future'
												onChange={handleChange}
												checked={formData.licensed === 'future'}
												type='checkbox'
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='future_licensed'
												className='font-medium text-gray-700'
											>
												Not yet, but I will be
											</label>
										</div>
									</div>
									<div className='relative flex items-start'>
										<div className='flex h-5 items-center'>
											<input
												id='no_licensed'
												name='licensed'
												value='no'
												type='checkbox'
												onChange={handleChange}
												checked={formData.licensed === 'no'}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='no_licensed'
												className='font-medium text-gray-700'
											>
												No
											</label>
										</div>
									</div>
									{formData.licensed === 'future' && (
										<div>
											<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
												<div className='sm:col-span-2'>
													<label
														htmlFor='date'
														className='block text-sm font-medium text-gray-700'
													>
														Expected licensure date
													</label>
													<div className='mt-1'>
														<input
															type='month'
															name='date'
															id='date'
															value={formData.date}
															onChange={handleChange}
															required
															className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
														/>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</fieldset>
						</div>
					</div>
				</div>

				{/* buttons */}
				<div className='pt-5'>
					<div className='flex justify-end'>
						<button
							type='submit'
							className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
