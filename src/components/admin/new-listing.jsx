import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import { toast } from 'react-toastify';
import ListingDetails from './listing-details';

export default function NewListing({ formEntries }) {
	const newEntry = {
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
		tier: '',
		specialty: '',
		type: '',
	};
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState(newEntry);

	const [description, setDescription] = useState('');

	const handleDescriptionChange = (text) => {
		setDescription(text);
	};

	const handleChange = (e) => {
		setPost({
			...post,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Maybe Later: Add validations here

		const postCopy = {
			...post,
			description,
			timestamp: serverTimestamp(),
		};

		const docRef = await addDoc(collection(db, 'listings'), postCopy);

		setLoading(false);
		// setPost(newEntry);
		setDescription('');
		toast.success('Listing Saved');
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
