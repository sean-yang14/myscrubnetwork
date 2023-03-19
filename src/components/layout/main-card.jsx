export default function MainCard({ children }) {
	return (
		<div>
			<div className='flex flex-col'>
				<div className='flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full'>
					{children}
				</div>
			</div>
		</div>
	);
}
