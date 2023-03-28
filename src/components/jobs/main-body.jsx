import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import DirectoryCard from '@/components/jobs/directory-card';
import FullPost from '@/components/jobs/full-post';
import ModalJob from '@/components/jobs/job-modal';
import StateDropdown from '@/components/jobs/state-dropdown';
import MainCard from '@/components/layout/main-card';
import Cities from './cities';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function MainBody({
	setOpen,
	open,
	handleModalClose,
	handleClick,
	totalPages,
	stateSelected,
	handleStateChange,
	handleNextPage,
	handlePrevPage,
	listings,
	selectedJob,
	currentPage,
	totalListings,
	cityList,
	setCitiesSelected,
	setCitiesSubmitted,
	currentCard,
}) {
	const [showCities, setShowCities] = useState(false);

	const handleCitiesClick = (e) => {
		setShowCities((prev) => !prev);
	};

	return (
		<>
			<MainCard>
				<ModalJob
					handleClick={handleModalClose}
					open={open}
					setOpen={setOpen}
					selectedJob={selectedJob}
				/>
				<div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
					{/* State selector */}

					<div className='mt-2 md:mt-4 flex space-x-8 justify-center items-center'>
						<StateDropdown
							selected={stateSelected}
							handleChange={handleStateChange}
						/>
						<div className='flex space-x-4 justify-center items-center'>
							<div className='block text-base font-medium text-center text-indigo-700'>
								Cities
							</div>
							<button
								disabled={
									cityList.length > 0 && stateSelected.name !== 'All'
										? false
										: true
								}
								type='button'
								onClick={handleCitiesClick}
								className='rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:bg-gray-300'
							>
								{showCities &&
								stateSelected.name !== 'All' &&
								cityList.length > 0 ? (
									<MinusIcon className='h-4 w-4' aria-hidden='true' />
								) : (
									<PlusIcon className='h-4 w-4' aria-hidden='true' />
								)}
							</button>
						</div>
					</div>
					{showCities &&
						cityList.length > 0 &&
						stateSelected.name !== 'All' && (
							<Cities
								cityList={cityList}
								setCitiesSelected={setCitiesSelected}
								setCitiesSubmitted={setCitiesSubmitted}
							/>
						)}

					{/* Start of content */}
					<div className='relative z-0 flex flex-1 overflow-hidden mt-4 md:mt-8 md:grid md:grid-cols-2'>
						{/* All posts */}
						<main className='relative z-0 flex-1 overflow-y-auto focus:outline-none'>
							<article className='h-screen overflow-y-auto xl:order-first md:flex md:flex-col'>
								{/* Job list */}
								<p className='text-sm font-medium mb-4 text-gray-900'>
									Total jobs: {totalListings}
								</p>
								<div
									className='min-h-0 flex-1 overflow-y-auto'
									aria-label='listings'
								>
									<ul>
										{listings?.map((job, i) => {
											return (
												<li key={i} id={i} onClick={handleClick}>
													<DirectoryCard
														job={job}
														current={currentCard[i] ? true : false}
													/>
												</li>
											);
										})}
									</ul>
									{/* Page numbers */}
									<nav
										className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'
										aria-label='Pagination'
									>
										<div className='hidden sm:block'>
											<p className='text-sm text-gray-700'>
												Showing page{' '}
												<span className='font-medium'>{currentPage}</span> of{' '}
												<span className='font-medium'>{totalPages}</span> pages
											</p>
										</div>
										<div className='flex flex-1 justify-between sm:justify-end'>
											<button
												onClick={handlePrevPage}
												className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
												disabled={currentPage === 1}
											>
												Previous
											</button>
											<button
												onClick={handleNextPage}
												className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
												disabled={currentPage === totalPages}
											>
												Next
											</button>
										</div>
									</nav>
								</div>
							</article>
						</main>

						{/* Full post */}
						<article className='overflow-y-auto sticky top-0 h-screen hidden md:order-last md:flex md:flex-col'>
							<FullPost selectedJob={selectedJob} />
						</article>
					</div>
				</div>
			</MainCard>
		</>
	);
}
