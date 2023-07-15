import MainCard from '../layout/main-card';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Tabs({ tabs, handleClick, handleChange }) {
	return (
		<MainCard>
			<div className='my-4 sm:pb-2'>
				<h3 className='text-lg font-semibold leading-6 text-gray-900 pb-2'>
					Specialty
				</h3>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<div className='block sm:hidden'>
					<label htmlFor='tabs' className='sr-only'>
						Select a tab
					</label>
					<select
						id='tabs'
						name='tabs'
						className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
						defaultValue={tabs.find((tab) => tab.current).id}
						onChange={handleChange}
					>
						{tabs.map((tab) => (
							<option key={tab.id}>{tab.name}</option>
						))}
					</select>
				</div>
				<div className='hidden sm:block border-b-2 border-gray-200 pb-2'>
					<nav className='flex space-x-4' aria-label='Tabs'>
						{tabs.map((tab) => (
							<button
								key={tab.name}
								id={tab.id}
								onClick={handleClick}
								className={classNames(
									tab.current
										? 'bg-indigo-100 text-indigo-700'
										: 'text-gray-500 hover:text-gray-700',
									'rounded-md px-3 py-2 text-sm font-normal cursor-pointer'
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								{tab.name}
							</button>
						))}
					</nav>
				</div>
			</div>
		</MainCard>
	);
}
