import MainCard from '../layout/main-card';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function PracticeToggle({ tabs, handleClick }) {
	return (
		<MainCard>
			<div>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				{/* <div className='hidden'>
					<label htmlFor='tabs' className='sr-only'>
						Select a tab
					</label>
					<select
						id='tabs'
						name='tabs'
						className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
						defaultValue={tabs.find((tab) => tab.current).id}
					>
						{tabs.map((tab) => (
							<option key={tab.name}>{tab.name}</option>
						))}
					</select>
				</div> */}
				<div className='max-w-sm mx-auto'>
					<nav
						className='isolate flex divide-x divide-gray-200 rounded-lg shadow'
						aria-label='Tabs'
					>
						{tabs.map((tab, tabIdx) => (
							<button
								key={tabIdx}
								id={tab.id}
								onClick={handleClick}
								className={classNames(
									tab.current
										? 'text-gray-900'
										: 'text-gray-500 hover:text-gray-700',
									tabIdx === 0 ? 'rounded-l-lg' : '',
									tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
									'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								{tab.name}
								<span
									aria-hidden='true'
									className={classNames(
										tab.current ? 'bg-indigo-500' : 'bg-transparent',
										'absolute inset-x-0 bottom-0 h-0.5'
									)}
								/>
							</button>
						))}
					</nav>
				</div>
			</div>
		</MainCard>
	);
}
