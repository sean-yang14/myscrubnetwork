import { useState, useEffect } from 'react';

export default function Cities({
	cityList,
	setCitiesSelected,
	setCitiesSubmitted,
}) {
	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		// let value = e.target.checked ? true : false;
		setFormData((prev) => ({
			...prev,
			[e.target.id]: e.target.checked,
		}));
	};

	// useEffect(() => {
	// 	console.log(formData);
	// }, [formData]);

	const cities = [];
	const handleSubmit = (e) => {
		e.preventDefault();
		for (const key in formData) {
			if (formData[key]) {
				cities.push(key);
			}
		}
		setCitiesSelected(cities);
		setCitiesSubmitted(true);
	};

	const handleClick = (e) => {
		for (const key in formData) {
			if (formData[key]) {
				setFormData((prev) => ({
					...prev,
					[key]: false,
				}));
			}
			let checkbox = document.getElementById(key);
			checkbox.checked = false;
		}

		setCitiesSelected([]);
		setCitiesSubmitted(true);
		setFormData({});
	};

	return (
		<form onSubmit={handleSubmit}>
			<legend className='sr-only'>Cities</legend>
			<div className='rounded-lg bg-white shadow-md flex justify-between p-4 mt-4 w-fit mx-auto'>
				<div className='relative flex space-x-8'>
					<div className='grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4'>
						{cityList.map((city) => {
							return (
								<div key={city} className='flex items-center'>
									<input
										id={city}
										name={city}
										// value='true'
										onChange={handleChange}
										type='checkbox'
										className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
									/>
									<div className='ml-3 text-sm leading-6'>
										<label
											htmlFor='comments'
											className='font-medium text-gray-900'
										>
											{city}
										</label>
									</div>
								</div>
							);
						})}
					</div>
					<div className='flex justify-center items-center flex-wrap sm:flex-nowrap sm:gap-x-4'>
						<button
							type='submit'
							className='h-fit w-fit inline-flex justify-center rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Apply
						</button>
						<button
							type='button'
							onClick={handleClick}
							className='h-fit w-fit inline-flex justify-center rounded-md bg-white px-8 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
						>
							Reset
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
