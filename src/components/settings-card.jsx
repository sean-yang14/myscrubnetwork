export default function SettingsCard({ children }) {
	return (
		<div>
			<div className='flex flex-1 flex-col md:pl-64'>
				<div className='flex-1'>{children}</div>
			</div>
		</div>
	);
}
