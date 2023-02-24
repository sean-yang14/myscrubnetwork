import { useState } from 'react';

const title = {
	one: 'Understanding rewards',
};
const description = 'A breakdown of how to earn rewards and win prizes.';
const headers = ['Action', 'How to Earn', 'Reward', 'Prize'];

const actions = [
	{
		action: 'Sign up referral',
		how: 'A new user enters your email when completing their profile after signing up',
		reward: '1 token',
		prize: 'Sign up sweepstakes',
	},
	{
		action: 'Application referral',
		how: "An applicant enters your referral email when submitting their application to a job found on Scrub Networks's job board",
		reward: '1 token',
		prize: 'Job dependent',
	},
	{
		action: 'Application submission',
		how: "You submit a job application found on Scrub Network's job board",
		reward: '2 tokens',
		prize: 'Job dependent',
	},
	{
		action: 'External application Referral',
		how: 'An applicant enters your referral email when submitting their application on the apply tab for a job found on another job board',
		reward: '1 token',
		prize: 'Sweepstakes',
	},
	{
		action: 'External application submission',
		how: 'You submit a job application on the apply tab for a job found on another job board',
		reward: '2 tokens',
		prize: 'Sweepstakes',
	},
];

export default function RewardsTable() {
	const [hide, setHide] = useState(false);
	const handleClick = () => {
		setHide((prev) => !prev);
	};

	return (
		<div className='mt-4 md:mt-8 px-4 sm:px-6 md:px-0'>
			{/* Rewards table  */}
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-xl font-semibold text-gray-900'>{title.one}</h1>
					<p className='mt-2 text text-gray-700'>{description.one}</p>
				</div>
				<div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
					<button
						onClick={handleClick}
						type='button'
						className='block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						{hide ? 'Show' : 'Hide'}
					</button>
				</div>
			</div>
			{!hide && (
				<>
					<div className='mt-4 md:mt-8 italic'>
						<span className='font-medium'>Token:</span> Works like a ticket
						that&#39;s entered into the appropriate sweepstakes once an eligible
						action has been taken.
					</div>
					<div className='mt-4 md:mt-8 italic'>
						You must have an account with Scrub Network to be eligible for
						rewards!
					</div>
					<div className='mt-4 md:mt-8 flow-root'>
						<div className='-my-2 -mx-6 overflow-x-auto lg:-mx-8'>
							<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
								<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
									<table className='min-w-full divide-y divide-gray-300'>
										<thead className='bg-gray-50'>
											<tr>
												{headers.map((header, i) => {
													return (
														<th
															key={i}
															scope='col'
															className='py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900'
														>
															{header}
														</th>
													);
												})}
											</tr>
										</thead>
										<tbody className='divide-y divide-gray-200 bg-white'>
											{actions.map((action, i) => (
												<tr key={i}>
													<td className='whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900'>
														{action.action}
													</td>
													<td className='px-3 py-4 text-sm text-gray-500'>
														{action.how}
													</td>
													<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
														{action.reward}
													</td>
													<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
														{action.prize}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
