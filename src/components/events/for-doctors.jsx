import Link from 'next/link';
import Image from 'next/image';

export default function ForDoctors() {
	return (
		<div className='overflow-hidden bg-white py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:flex lg:px-8'>
				<div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8'>
					<div className='lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8'>
						<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
							For Doctors
						</h2>
						<p className='mt-6 text-xl leading-8 text-gray-600'>
							The vision of this company from the start was to build a true
							community for healthcare providers, hence the name Scrub Network.
							If you&#39;re interested in attending our events let us know via
							the contact form, and we&#39;ll make sure that you are added to
							our distribution list for event sign ups.
						</p>
						{/* <p className='mt-6 text-base leading-7 text-gray-600'>
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
							lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
							fugiat. Quasi aperiam sit non sit neque reprehenderit.
						</p> */}
						<div className='mt-10 flex'>
							<Link
								href='/contact-us'
								className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Contact Us <span aria-hidden='true'>&rarr;</span>
							</Link>
						</div>
					</div>
					<div className='flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents'>
						<div className='w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end'>
							<Image
								src='/event_1.jpg'
								alt=''
								className='aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover'
								width={500}
								height={500}
							/>
						</div>
						<div className='contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8'>
							<div className='order-first flex w-64 flex-none justify-end self-end lg:w-auto'>
								<Image
									src='/event_4.jpg'
									alt=''
									className='aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
									width={500}
									height={500}
								/>
							</div>
							<div className='flex w-96 flex-auto justify-end lg:w-auto lg:flex-none'>
								<Image
									src='/event_2.jpg'
									alt=''
									className='aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
									width={500}
									height={500}
								/>
							</div>
							<div className='hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none'>
								<Image
									src='/event_3.jpg'
									alt=''
									className='aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover'
									width={500}
									height={500}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
