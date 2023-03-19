import { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Contact us', href: '/contact' },
];

export default function Navbar({ contact }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className={contact && 'bg-gray-100'}>
			<div className='px-6 pt-6 lg:px-8'>
				<nav className='flex items-center justify-between' aria-label='Global'>
					{/* menu bar for mobile screens */}
					<div className='flex sm:hidden'>
						<div className='flex justify-center'>
							<button
								type='button'
								className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
								onClick={() => setMobileMenuOpen(true)}
							>
								<span className='sr-only'>Open main menu</span>
								<Bars3Icon className='h-6 w-6' aria-hidden='true' />
							</button>
							<div className='ml-4 flex lg:flex-1'>
								<Link href='/' className='-m-1.5 p-1.5'>
									<span className='sr-only'>Scrub Network</span>
									<div className='flex items-baseline font-bold'>
										<h1 className='text-2xl text-indigo-500'>Scrub Network</h1>
										<span className='text-4xl leading-[0] pl-1'>.</span>
									</div>
								</Link>
							</div>
						</div>
					</div>
					<div className='hidden sm:block flex lg:flex-1'>
						<Link href='/' className='-m-1.5 p-1.5'>
							<span className='sr-only'>Scrub Network</span>
							<div className='flex items-baseline font-bold'>
								<h1 className='text-2xl text-indigo-500'>Scrub Network</h1>
								<span className='text-4xl leading-[0] pl-1'>.</span>
							</div>
						</Link>
					</div>

					{/* <div className='hidden lg:flex lg:gap-x-12'>
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className='text-sm font-semibold leading-6 text-gray-900'
								>
									{item.name}
								</a>
							))}
						</div> */}
					<div className='flex space-x-4 lg:space-x-8 lg:flex-1 lg:justify-end'>
						<Link
							href='/contact'
							className='hidden sm:block text-lg font-semibold leading-6 text-gray-900'
						>
							Home
						</Link>
						<Link
							href='/contact'
							className='hidden sm:block text-lg font-semibold leading-6 text-gray-900'
						>
							Contact us
						</Link>
						<Link
							href='/sign-up'
							className='hidden sm:block text-lg font-semibold leading-6 text-gray-900'
						>
							Sign up
						</Link>
						<Link
							href='/sign-in'
							className='text-lg font-semibold leading-6 text-gray-900'
						>
							Log in <span aria-hidden='true'>&rarr;</span>
						</Link>
					</div>
				</nav>
				<Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
					<Dialog.Panel
						focus='true'
						className='fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden'
					>
						<div className='flex items-center justify-between'>
							<Link href='/' className='-m-1.5 p-1.5'>
								<span className='sr-only'>Scrub Network</span>
								<div className='flex items-baseline font-bold'>
									<h1 className='text-2xl text-indigo-500'>Scrub Network</h1>
									<span className='text-4xl leading-[0] pl-1'>.</span>
								</div>
							</Link>
							<button
								type='button'
								className='-m-2.5 rounded-md p-2.5 text-gray-700'
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className='sr-only'>Close menu</span>
								<XMarkIcon className='h-6 w-6' aria-hidden='true' />
							</button>
						</div>
						<div className='mt-6 flow-root'>
							<div className='-my-6 divide-y divide-gray-500/10'>
								<div className='space-y-2 py-6'>
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
										>
											{item.name}
										</a>
									))}
								</div>
								<div className='py-6'>
									<Link
										href='/sign-in'
										className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
									>
										Log in
									</Link>
									<Link
										href='/sign-up'
										className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
									>
										Sign up
									</Link>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</div>
		</div>
	);
}
