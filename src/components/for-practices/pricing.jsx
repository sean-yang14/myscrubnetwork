import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
	{
		name: 'Standard Post',
		id: 'tier-standard',
		href: '/post-a-job',
		price: 'Free',
		description: 'For optimal results, we suggest offering a referral bonus.',
		features: ['Unlimited posts', 'Posts stay up until role is filled'],
		featured: false,
		cta: 'Create post',
	},
	{
		name: 'Sponsored Post',
		id: 'tier-sponsored',
		href: '/post-a-job',
		price: 'Starting at $15',
		description:
			'Sponsored posts sit at the top of the results in order from highest bid to lowest.',
		features: ['Sponsorship lasts for a 7 days'],
		featured: false,
		cta: 'Sponsor post',
	},
	{
		name: 'Recruiting Services',
		id: 'tier-recruiting',
		href: '/recruiting',
		price: 'Plan dependent',
		description:
			'Personalized recruiting services at market leading low prices.',
		features: [
			'Targeted candidate search',
			'Access to our high quality network of doctors',
			'Low risk pricing',
		],
		featured: true,
		cta: 'Learn more',
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	return (
		<div className='bg-white py-24 sm:py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='max-w-4xl'>
					{/* <h2 className='text-base font-semibold leading-7 text-indigo-600'>
						Pricing
					</h2> */}
					<p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
						Product Offerings
					</p>
				</div>
				<p className='mt-6 max-w-2xl text-xl leading-8 text-gray-600'>
					No matter your hiring challenges, we have a solution.
				</p>
				<div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
					{tiers.map((tier) => (
						<div
							key={tier.id}
							className={classNames(
								tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
								'rounded-3xl p-8 ring-1 xl:p-10'
							)}
						>
							<h3
								id={tier.id}
								className={classNames(
									tier.featured ? 'text-white' : 'text-gray-900',
									'text-2xl font-semibold leading-8'
								)}
							>
								{tier.name}
							</h3>
							<p
								className={classNames(
									tier.featured ? 'text-gray-300' : 'text-gray-600',
									'mt-4 text-base leading-6'
								)}
							>
								{tier.description}
							</p>
							<p className='mt-6 flex items-baseline gap-x-1'>
								<span
									className={classNames(
										tier.featured ? 'text-white' : 'text-gray-900',
										'text-4xl font-bold tracking-tight'
									)}
								>
									{tier.price}
								</span>
							</p>
							<a
								href={tier.href}
								aria-describedby={tier.id}
								className={classNames(
									tier.featured
										? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
										: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
									'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
								)}
							>
								{tier.cta}
							</a>
							<ul
								role='list'
								className={classNames(
									tier.featured ? 'text-gray-300' : 'text-gray-600',
									'mt-8 space-y-3 text-base leading-6 xl:mt-10'
								)}
							>
								{tier.features.map((feature) => (
									<li key={feature} className='flex gap-x-3'>
										<CheckIcon
											className={classNames(
												tier.featured ? 'text-white' : 'text-indigo-600',
												'h-6 w-5 flex-none'
											)}
											aria-hidden='true'
										/>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
