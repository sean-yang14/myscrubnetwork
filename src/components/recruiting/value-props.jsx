import {
	CreditCardIcon,
	MagnifyingGlassIcon,
	UserGroupIcon,
	PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';

const features = [
	{
		name: 'Effective Outreach',
		description:
			'Other recruiting firms rely heavily on cold outreaches, which have a low success rate. At Scrub Network, utilize our deep personal relationships with the doctors in our network to more effectively find the right doctor(s) for your practice.',
		icon: PhoneArrowUpRightIcon,
	},
	{
		name: 'Low Risk Pricing',
		description:
			'Our pricing plans are built with practice owners in mind. We utilize contingent-based pricing so that owners can be reassured knowing that they are receiving the value of what they pay for.',
		icon: CreditCardIcon,
	},
	{
		name: 'Targeted Search',
		description:
			"We understand the importance of finding the right fit for your practice. That's why we work closely with you to understand what your needs and wants are.",
		icon: MagnifyingGlassIcon,
	},
	{
		name: 'High Quality Doctors',
		description:
			'Our network of dentists is second to none. In addition to their stellar resumes, these dentists has been vetted by their peers to ensure that they can thrive in your practice.',
		icon: UserGroupIcon,
	},
];

export default function ValueProps() {
	return (
		<div className='bg-white pt-14 pb-16 lg:pt-16 lg:pb-24'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='sm:text-left'>
					{/* <h2 className='text-2xl font-semibold leading-8 text-indigo-600'>
						Recruiting
					</h2> */}
					<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
						Find the Right Dentist For Your Practice
					</p>
				</div>

				<div className='mt-14 lg:mt-20 max-w-lg sm:mx-auto md:max-w-none'>
					<div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12'>
						{features.map((feature) => (
							<div
								key={feature.name}
								className='relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row'
							>
								<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0'>
									<feature.icon className='h-8 w-8' aria-hidden='true' />
								</div>
								<div className='sm:min-w-0 sm:flex-1 mt-2'>
									<p className='text-lg font-semibold leading-8 text-gray-900'>
										{feature.name}
									</p>
									<p className='mt-2 leading-7 text-gray-600 text-base'>
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
