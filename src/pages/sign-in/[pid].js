import SignInComponent from "@/components/login/sign-in"

export default function DynamicSignIn({pid }) {
  
  return (
    <>
      <SignInComponent instructions={pid} />
    </>
  )
}

export async function getServerSideProps(context) {
  const {pid} = context.query
  
  return {
    props: {
      pid,
    },
  }
}