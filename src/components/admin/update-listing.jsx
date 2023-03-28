import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	addDoc,
	collection,
	serverTimestamp,
	doc,
	getDoc,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import { toast } from 'react-toastify';
import ListingDetails from './listing-details';

export default function NewListing({ formEntries, id }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState({
		title: '',
		name: '',
		website: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		salary: '',
		interval: '',
		schedule: '',
		schedule: '',
		tier: '',
		specialty: '',
		type: '',
	});
	const [description, setDescription] = useState('');

	// On load, pull post data from server
	useEffect(() => {
		const fetchPostData = async () => {
			try {
				const listingRef = doc(db, 'listings', id);
				const queryDoc = await getDoc(listingRef);
				setPost({
					...queryDoc.data(),
					id: queryDoc.id,
				});
				setDescription(queryDoc.data().description);
				delete post.description;
			} catch (error) {
				console.log(error);
				toast.error('Could not retrieve post info');
			}
		};

		fetchPostData();
	}, []);

	const handleDescriptionChange = (text) => {
		setDescription(text);
	};

	const handleChange = (e) => {
		setPost({
			...post,
			[e.target?.id]: e.target?.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Maybe Later: Add validations here

		const postCopy = {
			...post,
			description,
			updated_timestamp: serverTimestamp(),
		};

		const docRef = await addDoc(collection(db, 'listings'), postCopy);

		setLoading(false);
		router.push('/jobs');
	};

	return (
		<>
			<ListingDetails
				post={post}
				formEntries={formEntries}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				description={description}
				handleDescriptionChange={handleDescriptionChange}
				loading={loading}
			/>
		</>
	);
}
