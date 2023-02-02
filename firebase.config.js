// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBsZ2_MZKmNAYdzRdUN14I69qXIOHBW3A",
  authDomain: "scrub-network-6b7f4.firebaseapp.com",
  projectId: "scrub-network-6b7f4",
  storageBucket: "scrub-network-6b7f4.appspot.com",
  messagingSenderId: "722490648154",
  appId: "1:722490648154:web:ce097c4c68d204ccceda63",
  measurementId: "G-9197301RJ6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const db = getFirestore()

// const firebaseConfig = JSON.parse(
//   process?.env?.FIREBASE_CONFIG ?? '{}',
// );

let analytics; 
let firestore;

if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  firestore = getFirestore();
}

export {analytics, firestore};