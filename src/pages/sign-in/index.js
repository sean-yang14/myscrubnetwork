import SignInComponent from "@/components/login/sign-in"

export default function SignIn() {
  if (typeof window !== 'undefined') {
    const protectedPage = sessionStorage.getItem('protectedPage')
    if (protectedPage) {
      sessionStorage.clear()
    }
  }

  return (
    <SignInComponent />
  )
}

