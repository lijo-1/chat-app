// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Ziyx5Yr14dFYDgF787rQFKMDRlcsujs",
  authDomain: "chat-app-1e52c.firebaseapp.com",
  projectId: "chat-app-1e52c",
  storageBucket: "chat-app-1e52c.appspot.com",
  messagingSenderId: "205798046025",
  appId: "1:205798046025:web:6cb9d2e422ecb9bb044298"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);               //used when auth is used in a proj
export const provider = new GoogleAuthProvider(); // handle auth using google sign in
export const db = getFirestore(app);