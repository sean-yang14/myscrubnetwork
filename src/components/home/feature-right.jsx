import {
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
} from '@heroicons/react/20/solid';

const features = [
	{
		name: 'Sweepstakes.',
		description:
			'Most contributions (referrals and applying to jobs) will enter you into a sweepstakes with the chance to win prizes. Details of the current sweepstakes, along with the list of eligible contributions, can be found on the rewards tab once logged in.',
		icon: CloudArrowUpIcon,
	},
	{
		name: 'Star jobs.',
		description:
			"Job postings with a star icon guarantee you a reward. If you refer the doctor that gets hired, you get a $1,000 bonus. If you get hired, we will provide you with a special new hire package (we promise you'll enjoy it).",
		icon: LockClosedIcon,
	},
	{
		name: 'Community events (coming soon).',
		description:
			'Key contributors to the network will be eligible to join for special events.',
		icon: ServerIcon,
	},
];

export default function FeatureRight() {
	return (
		<div className='overflow-hidden bg-white py-24 sm:py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
					<div className='lg:ml-auto lg:pt-4 lg:pl-4'>
						<div className='lg:max-w-lg'>
							<h2 className='text-lg font-semibold leading-8 tracking-tight text-indigo-600'>
								Rewards
							</h2>
							<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
								Make money, win prizes
							</p>
							<p className='mt-6 text-lg leading-8 text-gray-600'>
								Get rewarded for applying to jobs as you&#39;ve always done.
								There&#39;s no catch. Plus as Scrub Network grows, so will the
								value of the rewards.
							</p>
							<dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
								{features.map((feature) => (
									<div key={feature.name} className='relative pl-9'>
										<dt className='inline font-semibold text-gray-900'>
											<feature.icon
												className='absolute top-1 left-1 h-5 w-5 text-indigo-600'
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
