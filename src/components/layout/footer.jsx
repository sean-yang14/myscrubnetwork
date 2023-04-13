import Link from 'next/link';

const navigation = {
	main: [
		// { name: 'Home', href: '/' },
		{ name: 'Contact Us', href: '/contact-us' },
	],
};

const footerYear = new Date().getFullYear();

export default function Footer() {
	return (
		<footer className='bg-white'>
			<div className='mx-auto max-w-7xl overflow-hidden mt-8 py-12 px-6 lg:px-8'>
				<div className='flex items-baseline justify-center font-bold mb-4'>
					<h1 className='text-xl text-indigo-500'>Scrub Network</h1>
					<span className='text-2xl leading-[0] pl-1'>.</span>
				</div>
				<nav
					className='-mb-6 flex justify-center space-x-12'
					aria-label='Footer'
				>
					{navigation.main.map((item) => (
						<div key={item.name} className='pb-6'>
							<Link
								href={item.href}
								className='text-md text-gray-600 hover:text-gray-900'
							>
								{item.name}
							</Link>
						</div>
					))}
				</nav>
				<p className='mt-8 text-center text-sm text-gray-500'>
					&copy; {footerYear} Scrub Network. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
