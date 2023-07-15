import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function StateDropdown({
	selected,
	handleChange,
	specialtyTab,
}) {
	let states = [];

	if (specialtyTab === 'general') {
		states = [
			{ id: 1, name: 'All' },
			{ id: 2, name: 'AL' },
			{ id: 3, name: 'AZ' },
			{ id: 4, name: 'CA' },
			{ id: 5, name: 'FL' },
			{ id: 6, name: 'GA' },
			{ id: 7, name: 'ID' },
			{ id: 8, name: 'IL' },
			{ id: 9, name: 'IN' },
			{ id: 10, name: 'MI' },
			{ id: 11, name: 'MO' },
			{ id: 12, name: 'NJ' },
			{ id: 13, name: 'NM' },
			{ id: 14, name: 'NY' },
			{ id: 15, name: 'OH' },
			{ id: 16, name: 'OR' },
			{ id: 17, name: 'PA' },
			{ id: 18, name: 'TX' },
			{ id: 19, name: 'VA' },
			{ id: 20, name: 'VT' },
			{ id: 21, name: 'WA' },
		];
	} else if (specialtyTab === 'endodontist') {
		states = [
			{ id: 1, name: 'All' },
			{ id: 2, name: 'CA' },
			{ id: 3, name: 'CT' },
			{ id: 4, name: 'NJ' },
		];
	} else if (specialtyTab === 'oral-surgeon') {
		states = [
			{ id: 1, name: 'All' },
			{ id: 2, name: 'GA' },
			{ id: 3, name: 'IL' },
			{ id: 4, name: 'NC' },
			{ id: 5, name: 'OK' },
		];
	} else if (specialtyTab === 'orthodontist') {
		states = [
			{ id: 1, name: 'All' },
			// { id: 2, name: 'WA' },
			// { id: 3, name: 'MA' },
			// { id: 4, name: 'NJ' },
			// { id: 5, name: 'NY' },
			// { id: 6, name: 'PA' },
		];
	} else if (specialtyTab === 'pediatric-dentist') {
		states = [
			{ id: 1, name: 'All' },
			{ id: 2, name: 'CT' },
			{ id: 3, name: 'MA' },
			{ id: 4, name: 'NJ' },
			{ id: 5, name: 'NY' },
			{ id: 6, name: 'PA' },
		];
	} else if (specialtyTab === 'periodontist') {
		states = [
			{ id: 1, name: 'All' },
			{ id: 2, name: 'AZ' },
			{ id: 3, name: 'KY' },
			{ id: 4, name: 'MI' },
			{ id: 5, name: 'WA' },
			// { id: 6, name: 'PA' },
		];
	} else if (specialtyTab === 'prosthodontist') {
		states = [
			{ id: 1, name: 'All' },
			// { id: 2, name: 'MA' },
		];
	} else {
		states = [
			{ id: 1, name: 'All' },
			// { id: 2, name: 'CT' },
			// { id: 3, name: 'MA' },
			// { id: 4, name: 'NJ' },
			// { id: 5, name: 'NY' },
			// { id: 6, name: 'PA' },
		];
	}

	return (
		<Listbox placeholder='NY' value={selected} onChange={handleChange}>
			{({ open }) => (
				<div className='flex space-x-4 justify-center items-center'>
					<Listbox.Label className='block text-base font-medium text-center text-indigo-700'>
						State
					</Listbox.Label>
					<div className='relative mt-1'>
						<Listbox.Button className='h-10 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-7 pr-14 text-center shadow-xl focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
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
