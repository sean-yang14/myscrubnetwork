import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const pricing = {
	tiers: [
		{
			type: 'DSOs & Large Groups',
			title: 'Concierge Service',
			price: '20%',
			frequency: 'of salary',
			description:
				'Fill job openings quickly, with highly skilled and motivated dentists early in their career.',
			features: [
				'Paid only if a doctor is placed',
				'Personalized targeting',
				'Job post included',
				'Thorough candidate pre-screening',
			],
			cta: '',
			mostPopular: false,
		},
		{
			type: 'Private Practice',
			title: 'Concierge Service',
			price: '$6k',
			frequency: 'flat fee',
			description:
				'For practices looking to find the perfect hire without leaving anything to chance.',
			features: [
				'1/3 paid if qualified candidates provided for interview',
				'Trial period of 60 days post hiring',
				'Remaining paid only if a doctor is placed and remains hired post the trial period',
				'Personalized targeting',
				'Job post included',
			],
			cta: '',
			mostPopular: false,
		},
		{
			type: 'Private Practice',
			title: 'Targeted Search',
			price: '$3k',
			frequency: 'flat fee',
			description:
				'For practices looking for candidates with specific qualifications.',
			features: [
				'1/3 paid upfront',
				'1/3 paid if qualified candidates provided for interview',
				'Remaining paid if doctor is placed',
				'Personalized targeting',
				'Job post included',
			],
			cta: '',
			mostPopular: false,
		},
	],
};

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Offerings() {
	return (
		<div className='mx-auto max-w-7xl bg-white py-24 px-6 lg:px-8'>
			<h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:leading-none lg:text-5xl'>
				Product Offerings For Any Budget
			</h2>
			<p className='mt-6 max-w-3xl text-xl text-gray-500'>
				Offerings below are for general dentists, please reach out for pricing
				details regarding the recruitment of specialists.
			</p>

			{/* Tiers */}
			<div className='mt-16 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-4 lg:space-y-0'>
				{pricing.tiers.map((tier) => (
					<div
						key={tier.title}
						className='relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm'
					>
						<div className='flex-1'>
							<h3 className='text-lg font-semibold'>{tier.type}</h3>
							<h3 className='text-2xl font-semibold text-indigo-600'>
								{tier.title}
							</h3>
							{tier.mostPopular ? (
								<p className='absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-500 py-1.5 px-4 text-sm font-semibold text-white'>
									Most popular
								</p>
							) : null}
							<p className='mt-4 flex items-baseline text-gray-900'>
								<span className='text-3xl font-bold tracking-tight'>
									{tier.price}
								</span>
								<span className='ml-2 text-2xl font-semibold'>
									{tier.frequency}
								</span>
							</p>
							<p className='mt-6 text-lg font-medium'>{tier.description}</p>

							{/* Feature list */}
							<ul role='list' className='mt-6 space-y-6 text-lg'>
								{tier.features.map((feature) => (
									<li key={feature} className='flex'>
										<ChevronRightIcon
											className='h-6 w-6 flex-shrink-0 text-indigo-500'
											aria-hidden='true'
										/>
										<span className='ml-3 text-gray-500'>{feature}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
			{/* <div className='mt-8 space-y-12'>
				<div className='relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm items-center'>
					<div className='flex-1'>
						<h3 className='text-2xl font-semibold'>
							What Our Competitors Charge
						</h3>
						<div className='mt-4 flex flex-col sm:flex-row sm:items-baseline text-gray-900'>
							<p className='text-5xl font-bold tracking-tight text-red-600'>
								20% - 25%
							</p>
							<p className='mt-4 ml-2 text-2xl font-semibold xs:mt-0'>
								of salary
							</p>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
}
