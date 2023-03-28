import {
	UserGroupIcon,
	CreditCardIcon,
	WrenchIcon,
} from '@heroicons/react/24/outline';

const features = [
	{
		name: 'Reach 100+ Dentists in the NYC Area',
		description:
			"Our network includes high quality dentists from a variety of backgrounds. So whatever you're looking for, you can find it here.",
		icon: UserGroupIcon,
	},
	{
		name: 'Posts are Free, No Strings Attached',
		description:
			'Unlike other job boards, posts are free and they stay up until the role is filled.',
		icon: CreditCardIcon,
	},
	{
		name: 'Made for Dentists',
		description:
			'Most job boards are designed for corporate jobs. Our products solve problems that are unique to dental practices.',
		icon: WrenchIcon,
	},
];

export default function Features() {
	return (
		<div className='bg-white py-16 sm:py-20'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto max-w-2xl lg:mx-0'>
					<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
						Why Post on Scrub Network
					</h2>
					<p className='mt-6 text-lg leading-8 text-gray-600'>
						Our posts reach qualified doctors faster than any other site. We
						also offer market leading affordable prices for our services.
					</p>
				</div>
				<div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
					<dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
						{features.map((feature) => (
							<div key={feature.name} className='flex flex-col'>
								<dt className='text-lg font-semibold leading-7 text-gray-900'>
									<div className='mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
										<feature.icon
											className='h-8 w-8 text-white'
											aria-hidden='true'
										/>
									</div>
									{feature.name}
								</dt>
								<dd className='mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600'>
									<p className='flex-auto'>{feature.description}</p>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
