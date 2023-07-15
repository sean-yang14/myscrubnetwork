import { useState } from 'react';
import NewListing from './new-listing';
import UpdateListing from './update-listing';

const formEntries = [
	{
		label: 'Position Title',
		type: 'text',
		name: 'title',
		id: 'title',
		placeholder: 'Associate Dentist',
		aria: 'position title',
	},
	{
		label: 'Practice Name',
		type: 'text',
		name: 'name',
		id: 'name',
		placeholder: 'Aspen Dental',
		aria: 'practice name',
	},
	{
		label: 'Practice Website',
		type: 'text',
		name: 'website',
		id: 'website',
		placeholder: 'aspendental.com',
		aria: 'practice website',
	},
	{
		label: 'City',
		type: 'text',
		name: 'city',
		id: 'city',
		placeholder: 'Long Island City',
		aria: 'practice city',
	},
	{
		label: 'State',
		type: 'text',
		name: 'state',
		id: 'state',
		placeholder: 'NY',
		aria: 'practice state',
	},
	{
		label: 'Partner',
		type: 'text',
		name: 'partner',
		id: 'partner',
		placeholder: 'Recruiting firm name',
		aria: 'partnership counterparty',
	},
	{
		label: 'Ranking',
		type: 'number',
		name: 'ranking',
		id: 'ranking',
		placeholder: 'Number used in rankings',
		aria: 'ranking',
	},
	{
		label: 'Referral Bonus',
		type: 'number',
		name: 'referralBonus',
		id: 'referralBonus',
		placeholder: '$xxxx',
		aria: 'referral bonus amount',
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function DashboardContent({ startObj, children, id }) {
	const [selected, setSelected] = useState({
		...startObj,
	});

	const tabs = [
		{ name: 'New Listing', id: 'new', current: selected.new },
		{ name: 'Update Listing', id: 'update', current: selected.update },
	];

	const handleTabSelected = (e) => {
		setSelected(() => ({
			new: false,
			update: false,

			[e.target.id]: true,
		}));
	};

	return (
		<>
			<main className='flex-1'>
				<div className='relative mx-auto max-w-5xl md:px-8 xl:px-0'>
					<div className='pt-10 pb-16'>
						<div className='px-4 sm:px-6 md:px-0'>
							<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
								Admin Dashboard
							</h1>
						</div>
						<div className='py-6'>
							{/* Tabs */}
							<div className='block'>
								<div className='border-b border-gray-200'>
									<nav className='px-4 sm:px-6 md:px-0 -mb-px flex space-x-8'>
										{tabs.map((tab) => (
											<a
												key={tab.name}
												id={tab.id}
												onClick={handleTabSelected}
												className={classNames(
													tab.current
														? 'border-purple-500 text-purple-600'
														: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
													'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
												)}
											>
												{tab.name}
											</a>
										))}
									</nav>
								</div>
							</div>
							{selected.new ? (
								<NewListing formEntries={formEntries} />
							) : selected.update ? (
								<UpdateListing formEntries={formEntries} id={id} />
							) : (
								<NewListing formEntries={formEntries} />
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
