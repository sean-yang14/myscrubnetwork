const people = [
	{
		title: 'Free Job Posts',
		scrubNetwork: 'Yes',
		indeed: 'Yes',
		zipRecruiter: 'No',
		dentistJobConnect: 'No',
		dentalPost: 'No',
	},
	{
		title: 'Starting Price',
		scrubNetwork: 'Free',
		indeed: 'Free',
		zipRecruiter: '$299 per month',
		dentistJobConnect: '$995 per post, with a 60 day expiration',
		dentalPost: '$119 per post, with a 30 day expiration',
	},
	{
		title: 'Facilitate Referral Bonuses',
		scrubNetwork: 'Yes',
		indeed: 'No',
		zipRecruiter: 'No',
		dentistJobConnect: 'No',
		dentalPost: 'No',
	},
	{
		title: 'Direct Reachout (Social Media)',
		scrubNetwork: 'Yes',
		indeed: 'No',
		zipRecruiter: 'No',
		dentistJobConnect: 'Yes',
		dentalPost: 'No',
	},
	{
		title: 'Actively Finds Qualified Applicants',
		scrubNetwork: 'Yes',
		indeed: 'No',
		zipRecruiter: 'No',
		dentistJobConnect: 'No',
		dentalPost: 'No',
	},
	// {
	// 	title: 'Highest Price',
	// 	scrubNetwork: '$1,500',
	// 	indeed: 'No Ceiling',
	// 	zipRecruiter: 'No Ceiling',
	// 	dentistJobConnect: '$329 for 30 days',
	// 	dentalPost: '$2,495 for 180 days',
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
										Dentist Job Connect
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
										<td className='whitespace-normal py-4 px-3 text-lg text-indigo-600 font-semibold text-center'>
											{person.scrubNetwork}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.indeed}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.zipRecruiter}
										</td>
										<td className='whitespace-normal py-4 px-3 text-base text-gray-700 text-center'>
											{person.dentistJobConnect}
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
