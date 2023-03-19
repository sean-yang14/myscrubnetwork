import {
	TrophyIcon,
	CurrencyDollarIcon,
	GiftIcon,
} from '@heroicons/react/20/solid';

const features = [
	{
		name: 'Referral bonuses.',
		description:
			'Refer a friend and if they get hired, get a referral bonus ranging from $250 to $1,000. Only applies to certain jobs.',
		icon: CurrencyDollarIcon,
	},
	{
		name: 'Sweepstakes.',
		description:
			'Use our platform to find the next job for you or a friend and earn the chance to win amazing prizes like a brand new MacBook!',
		icon: TrophyIcon,
	},
	{
		name: 'Our promise.',
		description:
			'We will invest more back into dentists than any other job board ever will. We have a radical vision of what the job searching experience can be and this is our first step in making it happen.',
		icon: GiftIcon,
	},
];

export default function FeatureRight() {
	return (
		<div className='overflow-hidden bg-white py-20 sm:py-24'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
					<div className='lg:ml-auto lg:pt-4 lg:pl-4'>
						<div className='lg:max-w-lg'>
							<h2 className='text-4xl font-bold leading-8 tracking-tight text-indigo-600'>
								Earn rewards
							</h2>
							<p className='mt-2 text-4xl font-bold tracking-tight text-gray-900'>
								for applying and referring
							</p>
							{/* <p className='mt-6 text-lg leading-8 text-gray-600'>
							There&#39;s no catch. Plus as Scrub Network grows, so will the
								value of the rewards.
							</p> */}
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
					<div className='flex items-start justify-end lg:order-first'>
						<img
							src='https://tailwindui.com/img/component-images/dark-project-app-screenshot.png'
							alt='Product screenshot'
							className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]'
							width={2432}
							height={1442}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
