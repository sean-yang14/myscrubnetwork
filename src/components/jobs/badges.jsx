const prizes = {
	1: ['$1,000 referral Bonus', 'Mega Sweepstakes'],

	2: ['$250 referral bonus', 'Sweepstakes', '2x'],

	3: ['Sweepstakes'],
};

export default function Badges({ tier }) {
	return (
		<div className='flex flex-wrap gap-x-4 gap-y-2 mb-4 mt-2'>
			{prizes[tier]?.map((prize, i) => (
				<span
					key={i}
					className='inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800'
				>
					{prize}
				</span>
			))}
		</div>
	);
}
