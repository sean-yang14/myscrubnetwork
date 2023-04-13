import {
	ChatBubbleLeftRightIcon,
	PresentationChartLineIcon,
	UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const features = [
	{
		name: 'Engage with a Captive Audience',
		description:
			"It's hard enough to get a dentist's attention, nevermind keep it long enough to sell the merits of your products or services. Our events allow you to engage meaningfully and naturally with a captive audience.",
		icon: ChatBubbleLeftRightIcon,
	},
	{
		name: 'Targeted Marketing',
		description:
			'We work with you to understand your goals and target audience, so that your sponsorship is used in the most beneficial way for your company.',
		icon: UsersIcon,
	},
	{
		name: 'Establish a New Acquisition Channel',
		description:
			"Scrub Network can help your company establish Events as a new acquisition channel. We'll leverage our expertise and network to host events that align with your company's goals. This way, you can reap the benefits without the cost of building and maintaining the function in-house.",
		icon: PresentationChartLineIcon,
	},
];

export default function Sponsors() {
	return (
		<div className='bg-white py-16 sm:py-20'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto lg:mx-0 lg:flex lg:items-center lg:justify-between'>
					<div className='max-w-3xl '>
						<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
							For Sponsors
						</h2>
						<p className='mt-6 text-lg leading-8 text-gray-600'>
							Capture the attention of dentists in a meaningful way that stands
							out from traditional marketing and avoids the challenges of cold
							sales tactics. If you&#39;d like to work together, let us know via
							the contact form.
						</p>
					</div>
					<div className='mt-6'>
						<Link
							href='/contact-us'
							className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Contact Us
						</Link>
					</div>
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
