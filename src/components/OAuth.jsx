import { useRouter } from 'next/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import Image from 'next/image';

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
			}

			router.push('/');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};

	return (
		<div className='mt-6 grid grid-cols-3 gap-3'>
			<div>
				<button
					className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
					onClick={handleGoogleClick}
				>
					<span className='sr-only'>Sign in with Google</span>
					<svg
						className='h-5 w-5'
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path
							fillRule='evenodd'
							d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			</div>
			<div>
				<button
					className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
					onClick={handleGoogleClick}
				>
					<span className='sr-only'>Sign in with Facebook</span>
					<svg
						className='h-5 w-5'
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path
							fillRule='evenodd'
							d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
