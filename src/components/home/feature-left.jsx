import {
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
} from '@heroicons/react/20/solid';

const features = [
	{
		name: 'Push to deploy.',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: CloudArrowUpIcon,
	},
	{
		name: 'SSL certificates.',
		description:
			'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
		icon: LockClosedIcon,
	},
	{
		name: 'Database backups.',
		description:
			'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
		icon: ServerIcon,
	},
];

export default function FeatureLeft() {
	return (
		<div className='overflow-hidden bg-white py-24 sm:py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
					<div className='lg:pr-8 lg:pt-4'>
						<div className='lg:max-w-lg'>
							<h2 className='text-lg font-semibold leading-8 tracking-tight text-indigo-600'>
								Job Posts
							</h2>
							<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
								All roads end here
							</p>
							<p className='mt-6 text-lg leading-8 text-gray-600'>
								Our goal is to become the only site dentists come to when
								looking for a job. However, that&#39;s not where Scrub Network
								is today. So, until that happens, we&#39;re offering you the
								opportunity to get rewarded for jobs not found on our site.
								Simply fill out an application on the Apply tab and link the
								external job post. We&#39;ll ensure that your application is
								sent immediately and received by the hiring practice. You can
								even apply on the other site as well.
							</p>
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
