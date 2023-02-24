export default function MainCard({ children }) {
	return (
		<div>
			<div className='flex flex-1 flex-col lg:pl-64'>
				<div className='flex-1'>{children}</div>
			</div>
		</div>
	);
}
