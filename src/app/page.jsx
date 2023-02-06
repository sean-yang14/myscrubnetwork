'use client';

import Image from 'next/image';
import { Inter } from '@next/font/google';
import { useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { db } from '../../lib/firebase.config';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [listing, setListings] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingsRef = collection(db, 'listings');
				const q = query(listingsRef, limit(10));
				const querySnap = await getDocs(q);
				let listings = [];

				querySnap.forEach((doc) => {
					console.log(doc.data());
				});
			} catch (error) {
				console.log(error);
			}
		};

		fetchListings();
	});
	return (
		<main>
			<div className='border-2 border-red-500 text-bold'>Home</div>
		</main>
	);
}
