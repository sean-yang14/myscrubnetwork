import { DocumentTextIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';

const features = [
	{
		name: 'Details that matter to you.',
		description:
			'Unlike other job boards that take a one size fits all approach for every career path, we are solely focused on creating a product that works perfectly for dentists.',
		icon: DocumentTextIcon,
	},
	{
		name: 'One place for all the jobs.',
		description:
			"Our goal is to have all open dentist positions listed on our website to optimize your job searching experience. We are working towards that goal. In the meantime, you can still get rewarded for external job posts. Simply fill out the application found on our Apply page (see picture) and we'll handle it from there.",
		icon: HandThumbUpIcon,
	},
];

export default function FeatureLeft() {
	return (
		<div className='overflow-hidden bg-white py-20 sm:py-24'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
					<div className='lg:pr-8 lg:pt-4'>
						<div className='lg:max-w-lg'>
							<h2 className='text-4xl font-bold leading-7 text-indigo-600'>
								A job board made
							</h2>
							<p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
								for dentists by dentists
							</p>
							<dl className='mt-10 max-w-xl space-y-8 text-lg leading-7 text-gray-600 lg:max-w-none'>
								{features.map((feature) => (
									<div key={feature.name} className='relative pl-9'>
										<dt className='inline font-semibold text-gray-900'>
											<feature.icon
												className='absolute top-1 left-1 h-6 w-6 text-indigo-600'
												aria-hidden='true'
											/>
											{feature.name}
										</dt>{' '}
										<dd className='inline'>{feature.description}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
					<img
						src='https://tailwindui.com/img/component-images/dark-project-app-screenshot.png'
						alt='Product screenshot'
						className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
						width={2432}
						height={1442}
					/>
				</div>
			</div>
		</div>
	);
}
