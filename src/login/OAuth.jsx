import { useRouter } from 'next/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase.config';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

export default function OAuth(props) {
	const router = useRouter();

	const handleGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check for User
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesnt, exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
				router.push('/sign-up/complete-profile');
			}

			router.push('/jobs');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};

	return (
		<div className='mt-6 mx-auto w-full'>
			<div>
				<button
					className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
					onClick={handleGoogleClick}
				>
					<span className='sr-only'>Sign in with Google</span>
					<FaGoogle />
				</button>
			</div>
		</div>
	);
}
