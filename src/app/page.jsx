import Image from 'next/image';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main>
			<div className='border-2 border-red-500 text-bold'>Home</div>
		</main>
	);
}
