import SignInComponent from "@/components/login/sign-in"

export default function SignIn() {
  sessionStorage.clear()
  return (
    <SignInComponent />
  )
}

