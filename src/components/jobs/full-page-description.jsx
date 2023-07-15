import { PaperClipIcon } from '@heroicons/react/20/solid';

export default function FullPageDescription({ post }) {
	return (
		<div className='px-6 lg:px-8'>
			<div>
				<h3 className='text-xl font-semibold leading-7 text-gray-900'>
					Job Information
				</h3>
				<p className='mt-1 max-w-2xl text leading-6 text-gray-500'>
					Details about the position and practice.
				</p>
			</div>
			<div className='mt-6 border-t border-gray-100'>
				<dl className='divide-y divide-gray-100'>
					<div className='py-6 sm:grid sm:grid-cols-3 sm:gap-4 '>
						<dt className=' font-medium text-lg leading-6 text-indigo-700'>
							Compensation Details
						</dt>
						<dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							<div
								className='prose prose-p:mt-0
								prose-p:mb-2
								prose-p:leading-normal
								prose-br:leading-none
								max-w-none'
								dangerouslySetInnerHTML={{ __html: post?.compensationDetails }}
							/>
						</dd>
					</div>
					<div className=' py-6 sm:grid sm:grid-cols-3 sm:gap-4 '>
						<dt className=' font-medium text-lg leading-6 text-indigo-700'>
							Full Description
						</dt>
						<dd className='mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							<div
								className='prose prose-p:mt-0
								prose-p:mb-2
								prose-p:leading-normal
								prose-br:leading-none
								max-w-none'
								dangerouslySetInnerHTML={{ __html: post?.fullDescription }}
							/>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
