const people = [
	{
		title: 'Free Job Posts',
		scrubNetwork: 'Yes',
		indeed: 'Yes, but with limited reach',
		linkedIn: 'Yes, but only 1 post for 21 days',
		zipRecruiter: 'No',
		dentalPost: 'No',
	},
	{
		title: 'Starting Price',
		scrubNetwork: '',
		indeed: '',
		linkedIn: '',
		zipRecruiter: '$299 per month',
		dentalPost: '$189 per post',
	},
	// {
	// 	title: 'Starting Sponsorship Price',
	// 	scrubNetwork: '< $2 per post per day',
	// 	indeed: '$5 per post per day',
	// 	linkedIn: '$5 per post per day',
	// 	zipRecruiter: '',
	// 	dentalPost: '',
	// },
];

export default function Competitors() {
	return (
		<div className='px-4 w-full sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-2xl font-semibold leading-6 text-gray-900'>
						How We Compare to Other Job Boards
					</h1>
					{/* <p className='mt-2 text-base text-gray-700'>
						A list of all the users in your account including their name, title,
						email and role.
					</p> */}
				</div>
			</div>
			<div className='mt-14 flow-root'>
				<div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300 table-fixed'>
							<thead className='bg-indigo-700 text-white'>
								<tr className=''>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-0 text-center w-1/6 text-white rounded-tl-lg rounded-bl-lg'
									></th>
									<th
										scope='col'
										className='py-3.5 px-3 text-left text-lg font-semibold text-gray-900 text-center w-1/6 text-white'
									>
										Scrub Network
									</th>
									<th
										scope='col'
										className='py-3.5 px-3 text-left text-lg font-semibold text-gray-900 text-center w-1/6 text-white'
									>
										Indeed
									</th>
									<th
										scope='col'
										className='py-3.5 px-3 text-left text-lg font-semibold text-gray-900 text-center w-1/6 text-white'
									>
										Zip Recruiter
									</th>
									<th
										scope='col'
										className='py-3.5 px-3 text-left text-lg font-semibold text-gray-900 text-center w-1/6 text-white'
									>
										LinkedIn
									</th>
									<th
										scope='col'
										className='py-3.5 px-3 text-left text-lg font-semibold text-gray-900 text-center w-1/6 text-white rounded-tr-lg rounded-br-lg'
									>
										Dental Post
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200'>
								{people.map((person, i) => (
									<tr key={i}>
										<td className='whitespace-normal py-4 px-3 text-lg font-semibold text-gray-900 text-center'>
											{person.title}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.scrubNetwork}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.indeed}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.zipRecruiter}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.linkedIn}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.dentalPost}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
