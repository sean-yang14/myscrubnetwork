import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const states = [
	{ id: 1, name: 'All' },
	{ id: 2, name: 'CT' },
	{ id: 3, name: 'MA' },
	{ id: 4, name: 'NJ' },
	{ id: 5, name: 'NY' },
	// { id: 6, name: 'PA' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function StateDropdown({ selected, handleChange }) {
	return (
		<Listbox placeholder='NY' value={selected} onChange={handleChange}>
			{({ open }) => (
				<div className='flex space-x-4 justify-center items-center'>
					<Listbox.Label className='block text-base font-medium text-center text-indigo-700'>
						State
					</Listbox.Label>
					<div className='relative mt-1'>
						<Listbox.Button className='h-10 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-center shadow-xl focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
							<span className='block truncate'>{selected.name}</span>
							<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
								<ChevronUpDownIcon
									className='h-5 w-5 text-gray-400'
									aria-hidden='true'
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave='transition ease-in duration-100'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
								{states.map((state) => (
									<Listbox.Option
										key={state.id}
										className={({ active }) =>
											classNames(
												active ? 'text-white bg-indigo-600' : 'text-gray-900',
												'relative cursor-default select-none py-2 pl-3 pr-9'
											)
										}
										value={state}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected ? 'font-semibold' : 'font-normal',
														'block truncate text-sm'
													)}
												>
													{state.name}
												</span>

												{selected ? (
													<span
														className={classNames(
															active ? 'text-white' : 'text-indigo-600',
															'absolute inset-y-0 right-0 flex items-center pr-4'
														)}
													>
														<CheckIcon className='h-5 w-5' aria-hidden='true' />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</div>
			)}
		</Listbox>
	);
}
