export default function DirectoryCard({ job }) {
	return (
		<div className='overflow-hidden bg-white border-gray-200 border-[1px] shadow sm:rounded-lg m-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50'>
			<div className='px-4 py-5 sm:px-6 flex flex-col space-y-2'>
				<h3 className='text-xl font-bold leading-6 text-gray-900'>
					{job.title}
				</h3>
				<h4 className='text-lg leading-6 text-gray-900'>{job.name}</h4>
				<h4 className='text-lg leading-6 text-gray-900'>{`${job.address}, ${job.city}, ${job.state}, ${job.zip}`}</h4>
				<span className='w-fit inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 font-medium text-green-800'>
					{`${job.salary} per ${job.interval}`}
				</span>
				<span className='w-fit inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 font-medium text-green-800'>
					{job.schedule}
				</span>
			</div>
			<div className='px-4 py-5 sm:px-6'>
				<ul>
					{job.items &&
						job.items.map((item, i) => {
							return <li key={i}>{item}</li>;
						})}
				</ul>
			</div>
		</div>
	);
}
