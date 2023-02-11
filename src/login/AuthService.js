// import { getApp } from 'firebase/app'
// import { signInWithPopup, getAuth, GoogleAuthProvider, signOut, AuthStateChanged } from 'firebase/auth'

// class AuthService {
//   constructor(firebaseApp) {
//     this.auth = getAuth(firebaseApp)
//   }

//   waitForUser(callback) {

//   }

//   loginWithGoogle() {
//     return signInWithPopup(this.auth, new GoogleAuthProvider).then((userCred) => {
//       return {
//         user:userCred.user
//       }
//     }).catch((error) => {
//       return {
//         error: error.message
//       }
//     })
//   }

//   async logout() {
//     await signOut(this.auth)
//   }
// }

// export default new AuthService(getApp())