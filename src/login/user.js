import {createContext, useContext} from 'react'

export const UserContext = createContext(null)

export const useUser = () => {
  return useContext(UserContext)
}

// Example of setting provider within the context

// export function UserProvider(props) {
//   const [user, setUser] = useState(null)
//   const [error, setError] = useState("")

//   const loginWithGoogle = async () => {
//     const {error, user} = await AuthService.loginWithGoogle()
//     setUser(user ?? null)
//     setError(error ?? "")
//   }

//   const logout = async() => {
//     await AuthService.logout()
//     setUser(null)
//   }
//   const value = {user, setUser, error, loginWithGoogle, logout}

//   return <userContext.Provider value={value} {...props}/>
// }