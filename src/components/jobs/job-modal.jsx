import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FullPost from '@/components/jobs/full-post';

export default function ModalJob({ selectedJob, open, setOpen, handleClick }) {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as='div' className='md:hidden relative z-10' onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					{/* this is the whole screen */}
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					{/* This is the whole screen */}
					<div className='flex min-h-full justify-center text-center items-center p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 translate-y-0 scale-95'
							enterTo='opacity-100 translate-y-0 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 scale-100'
							leaveTo='opacity-0 translate-y-4 translate-y-0 scale-95'
						>
							{/* Content */}
							<Dialog.Panel className='relative transform rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl transition-all m-8 w-full max-w-md'>
								<FullPost
									screen='mobile'
									handleClick={handleClick}
									selectedJob={selectedJob}
								/>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
