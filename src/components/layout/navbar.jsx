import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import { useUser } from '@/login/user';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	const router = useRouter();

	// Check if user is admin
	const auth = getAuth();
	const [userData, setUserData] = useState(null);
	const [authInitialized, setAuthInitialized] = useState(false);
	// const value = useUser();

	// Section: On load, pull user data from server
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const fetchUserData = async () => {
					try {
						const userRef = doc(db, 'users', auth.currentUser.uid);
						const queryDoc = await getDoc(userRef);
						setUserData({
							...queryDoc.data(),
							id: queryDoc.id,
						});
					} catch (error) {
						console.log(error);
					}
				};

				fetchUserData();
			} else {
				setUserData(null);
			}
			setAuthInitialized(true);
		});

		return () => {
			unsubscribe();
		};
	}, [auth]);

	// Section: Redirect if user is not an admin
	// useEffect(() => {
	// 	if (authInitialized && userData && userData.admin !== 'yes') {
	// 	}
	// }, [authInitialized, userData, router]);

	const handleLogout = async (e) => {
		await signOut(auth);
		router.push('/jobs');
	};

	return (
		<Disclosure as='nav' className='bg-white shadow'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<div className='flex h-16 justify-between'>
							<div className='flex flex-shrink-0 items-center'>
								<Link href='/jobs'>
									<div className='flex flex-shrink-0 items-center pr-4'>
										<h1 className='text-lg text-indigo-500 font-bold'>
											Scrub Network
										</h1>
										<span className='text-xl font-bold leading-[0] pl-1'>
											.
										</span>
									</div>
								</Link>
							</div>

							<div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
								<Link
									href='/jobs'
									className={classNames(
										router.pathname === '/jobs'
											? 'border-indigo-500 text-slate-900'
											: 'border-transparent text-slate-600',
										'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
									)}
									name='jobs'
								>
									Jobs
								</Link>
								<Link
									href='/post-a-job'
									className={classNames(
										router.pathname === '/post-a-job'
											? 'border-indigo-500 text-slate-900'
											: 'border-transparent text-slate-600',
										'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
									)}
									name='postJob'
								>
									Post a Job
								</Link>
								<Link
									href='/job-seekers'
									className={classNames(
										router.pathname === '/job-seekers'
											? 'border-indigo-500 text-slate-900'
											: 'border-transparent text-slate-600',
										'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
									)}
									name='jobSeekers'
								>
									For Job Seekers
								</Link>
								<Link
									href='/contact-us'
									className={classNames(
										router.pathname === '/contact-us'
											? 'border-indigo-500 text-slate-900'
											: 'border-transparent text-slate-600',
										'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
									)}
									name='contact'
								>
									Contact
								</Link>
							</div>

							{/* Invisible - used for spacing */}
							<div className='flex flex-shrink-0 items-center pr-4 invisible'>
								<h1 className='text-lg text-indigo-500 font-bold'>
									Scrub Network
								</h1>
								<span className='text-xl font-bold leading-[0] pl-1'>.</span>
							</div>

							{/* Profile dropdown - far right user data icons*/}
							{/* <div className='hidden lg:ml-6 lg:flex lg:items-center'>
								<span className='ml-4 flex flex-shrink-0 items-start space-x-4'>
									
									{userData ? (
										<Menu as='div' className='relative ml-3'>
											<div>
												<Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
													<span className='sr-only'>Open user menu</span>
													<UserIcon className='h-7 w-7 rounded-full border-slate border-[2px] p-1' />
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-200'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-slate ring-opacity-5 focus:outline-none'>
													<Menu.Item>
														{({ active }) => (
															<Link
																
																href='/settings'
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Settings
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<button
																onClick={handleLogout}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2  w-full text-left text-sm text-gray-700'
																)}
															>
																Sign Out
															</button>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									) : (
										<Link
											href='/sign-in'
											className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-semibold text-indigo-700 hover:border-indigo-300 hover:text-indigo-900'
											
										>
											Sign In
										</Link>
									)}
									<span className='text-gray-300' aria-hidden='true'>
										|
									</span>
									<Link
										href='/post-a-job'
										className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900'
										onClick={handleOtherIcons}
									>
										Post a Job
									</Link>
								</span>
							</div> */}
							<div className='-mr-2 flex items-center lg:hidden'>
								{/* Mobile menu button */}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='lg:hidden'>
						<div className='space-y-1 pt-2 pb-3'>
							<Disclosure.Button
								as='a'
								href='/jobs'
								className={classNames(
									router.pathname === '/jobs'
										? 'border-indigo-500 bg-indigo-50 text-indigo-700'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
									'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
								)}
								name='jobs'
							>
								Jobs
							</Disclosure.Button>
							<Disclosure.Button
								as='a'
								href='/post-a-job'
								className={classNames(
									router.pathname === '/post-a-job'
										? 'border-indigo-500 bg-indigo-50 text-indigo-700'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
									'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
								)}
								name='postJob'
							>
								Post a Job
							</Disclosure.Button>

							<Disclosure.Button
								as='a'
								href='/job-seekers'
								className={classNames(
									router.pathname === '/job-seekers'
										? 'border-indigo-500 bg-indigo-50 text-indigo-700'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
									'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
								)}
								name='jobSeekers'
							>
								For Job Seekers
							</Disclosure.Button>
							<Disclosure.Button
								as='a'
								href='contact-us'
								className={classNames(
									router.pathname === '/contact-us'
										? 'border-indigo-500 bg-indigo-50 text-indigo-700'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
									'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
								)}
								name='contract'
							>
								Contact
							</Disclosure.Button>
						</div>
						{/* User menu items on mobile */}
						{/* {!userData && (
							<div className='border-t border-gray-200 pt-4 pb-3'>
								<div className='space-y-1'>
									<Disclosure.Button
										as='a'
										href='/sign-in'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
									>
										Sign In
									</Disclosure.Button>
								</div>
							</div>
						)}
						{userData && (
							<div className='border-t border-gray-200 pt-4 pb-3'>
								<div className='flex items-center px-4'>
									<div className='flex-shrink-0'>
										<UserIcon className='h-7 w-7 rounded-full' />
									</div>
									<div className='ml-3'>
										<div className='text-base font-medium text-gray-800'>
											{userData?.name}
										</div>
										<div className='text-sm font-medium text-gray-500'>
											{userData?.email}
										</div>
									</div>
								</div>
								<div className='space-y-1'>
									<Disclosure.Button
										as='a'
										href='/settings'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
									>
										Settings
									</Disclosure.Button>
									<Disclosure.Button
										as='a'
										onClick={handleLogout}
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
									>
										Sign Out
									</Disclosure.Button>
								</div>
							</div>
						)} */}
						{/* Separate post a job nav link on mobile */}
						{/* <div className='border-t border-gray-200 pt-4 pb-3'>
							<div className='space-y-1'>
								<Disclosure.Button
									as='a'
									href='/post-a-job'
									className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
								>
									Post a Job
								</Disclosure.Button>
							</div>
						</div> */}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
