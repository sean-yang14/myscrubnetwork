import useAuth from "./useAuth-copy";
import {useRouter} from 'next/router'

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth()
    const router = useRouter()

    if (auth.user) {
      router.push('/')
      return <h1>Loading...</h1>
    }
    return <Component auth={auth} {...props}/>
  }
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth()
    const router = useRouter()

    if (!auth.user) {
      router.push('/login')
      return <h1>Loading...</h1>
    }
    return <Component auth={auth} {...props}/>
  }
}