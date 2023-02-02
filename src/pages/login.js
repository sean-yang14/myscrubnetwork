import Link from 'next/link'


export default function Login() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <h1 className='text-2xl text-red-500'>Join Now</h1>
          </li>
        </ul>
      </nav>
      <button>Sign in with Google</button>
    </>
  )
}