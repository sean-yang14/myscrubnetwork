'use client';

// import { useRouter } from 'next/navigation';

// export default function Home() {
// 	const router = useRouter();
// 	router.push('/jobs');
// }

import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push('/jobs');
	}, []);
}
