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
		city: '',
		state: '',
		partner: '',
		ranking: '',
		referralBonus: '',
		specialty: '',
		type: '',
		pastedCompDetails: '',
		pastedDescription: '',
	};
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState(newEntry);

	const [fullDescription, setFullDescription] = useState('');

	const handleFullDescriptionChange = (text) => {
		setFullDescription(text);
	};
	const [compensationDetails, setCompensationDetails] = useState('');

	const handleCompensationDetailsChange = (text) => {
		setCompensationDetails(text);
	};

	const handleChange = (e) => {
		setPost({
			...post,
			[e.target.id]: e.target.value,
		});
	};

	const handleConversionChange = (e) => {
		setPost({
			...post,
			[e.target.id]: e.target.value,
		});
		setCompensationDetails(post.pastedCompDetails);
		setFullDescription(post.pastedDescription);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Maybe Later: Add validations here

		const postCopy = {
			...post,
			fullDescription,
			compensationDetails,
			timestamp: serverTimestamp(),
		};

		delete postCopy.pastedCompDetails;
		delete postCopy.pastedDescription;

		const docRef = await addDoc(collection(db, 'listings'), postCopy);

		setLoading(false);
		// setPost(newEntry);
		// setPost({ ...post, pastedCompDetails: '', pastedDescription: '' });
		setPost({ ...post, city: '', state: '' });
		setFullDescription('');
		setCompensationDetails('');
		toast.success('Listing Saved');
	};

	return (
		<>
			<ListingDetails
				post={post}
				formEntries={formEntries}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				fullDescription={fullDescription}
				handleFullDescriptionChange={handleFullDescriptionChange}
				compensationDetails={compensationDetails}
				handleCompensationDetailsChange={handleCompensationDetailsChange}
				loading={loading}
				handleConversionChange={handleConversionChange}
			/>
		</>
	);
}
