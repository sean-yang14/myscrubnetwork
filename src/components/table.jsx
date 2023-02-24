const people = [
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		email: 'lindsay.walton@example.com',
		role: 'Member',
	},
	// More people...
];

export default function Table() {
	return (
		<div className='px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-xl font-semibold text-gray-900'>Users</h1>
					<p className='mt-2 text-sm text-gray-700'>
						A list of all the users in your account including their name, title,
						email and role.
					</p>
				</div>
				<div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
					<button
						type='button'
						className='block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add user
					</button>
				</div>
			</div>
			<div className='mt-8 flow-root'>
				<div className='-my-2 -mx-6 overflow-x-auto lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
							<table className='min-w-full divide-y divide-gray-300'>
								<thead className='bg-gray-50'>
									<tr>
										<th
											scope='col'
											className='py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900'
										>
											Name
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
										>
											Title
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
										>
											Email
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
										>
											Role
										</th>
										<th scope='col' className='relative py-3.5 pl-3 pr-6'>
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-200 bg-white'>
									{people.map((person) => (
										<tr key={person.email}>
											<td className='whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900'>
												{person.name}
											</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
												{person.title}
											</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
												{person.email}
											</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
												{person.role}
											</td>
											<td className='relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium'>
												<a
													href='#'
													className='text-indigo-600 hover:text-indigo-900'
												>
													Edit<span className='sr-only'>, {person.name}</span>
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
