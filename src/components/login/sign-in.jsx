import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../../login/OAuth';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import MainLayout from '@/components/layout/main-layout';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

export default function SignInComponent({ instructions }) {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	// useEffect(() => {
	//   const jwt_token = cookie.get('login_token')
	//   if (loginToken) {
	//     try {
	//       const payload = jwt.verify(jwt_token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
	//       setFormData({
	//         email: payload.email,
	//         password: payload.password
	//       })
	//     } catch (error) {
	//       console.log(error);
	//     }
	//   }
	// }, [])

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const auth = getAuth();

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			// const jwt_token = jwt.sign({email, password}, process.env.NEXT_PUBLIC_JWT_SECRET_KEY)
			// if (e.target.remember-me.checked) {
			//   cookie.set('login_token', jwt_token, {expires: 30})
			// } else {
			//   cookie.set('login_token', jwt_token)
			// }

			if (userCredential.user) {
				const protectedPage = sessionStorage.getItem('protectedPage');
				if (protectedPage) {
					router.push(protectedPage);
				} else {
					router.push('/jobs');
				}
			}
		} catch (error) {
			toast.error('Bad User Credentils');
		}
	};

	const handleShowPassword = (e) => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<>
			<div className='flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<Link href='/'>
						<div className='flex justify-center items-baseline font-bold'>
							<h1 className='text-2xl text-indigo-500'>Scrub Network</h1>
							<span className='text-4xl leading-[0] pl-1'>.</span>
						</div>
					</Link>
					<h2 className='mt-4 text-center text-3xl font-bold tracking-tight text-gray-900'>
						{/* {instructions ? 'Sign In to Apply' : 'Sign In'} */}
						Sign In
					</h2>
				</div>

				{instructions && (
					<Link
						href='/jobs'
						className='flex justify-center mt-4 font-medium text-indigo-600 hover:text-indigo-500'
					>
						Go back to searching{' '}
					</Link>
				)}

				<div className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10'>
						<form className='space-y-6' onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700'
								>
									Email address
								</label>
								<div className='mt-1'>
									<input
										id='email'
										type='email'
										autoComplete='email'
										required
										value={email}
										onChange={handleChange}
										className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-700'
								>
									Password
								</label>
								<div className='relative rounded-md shadow-sm mt-1'>
									<input
										id='password'
										type={showPassword ? 'text' : 'password'}
										autoComplete='current-password'
										value={password}
										onChange={handleChange}
										required
										className='block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base'
									/>
									<div
										className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
										onClick={handleShowPassword}
									>
										{showPassword ? (
											<FaRegEye className='h-5 w-5 text-gray-400' />
										) : (
											<FaRegEyeSlash className='h-5 w-5 text-gray-400' />
										)}
									</div>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								{/* <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-base text-gray-900">
                    Remember me
                  </label>
                </div> */}

								<div className='text-sm'>
									<Link
										href='/forgot-password'
										className='font-medium text-indigo-600 hover:text-indigo-500'
									>
										Forgot your password?
									</Link>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
								>
									Sign in
								</button>
							</div>
						</form>

						<div className='mt-6'>
							<div className='relative'>
								<div className='absolute inset-0 flex items-center'>
									<div className='w-full border-t border-gray-300' />
								</div>
								<div className='relative flex justify-center text-sm'>
									<span className='bg-white px-2 text-gray-500'>
										or continue with
									</span>
								</div>
							</div>

							<OAuth />

							<div className='relative mt-6'>
								<div className='absolute inset-0 flex items-center'>
									<div className='w-full border-t border-gray-300' />
								</div>
								<div className='relative flex justify-center text-base'></div>
							</div>
							<Link
								href='/sign-up'
								className='flex justify-center mt-4 font-medium text-indigo-600 hover:text-indigo-500'
							>
								Sign up instead{' '}
								<span aria-hidden='true' className='ml-1'>
									&rarr;
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
