// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: "chat-7c58a",
  storageBucket: "chat-7c58a.appspot.com",
  messagingSenderId: "806326191794",
  appId: "1:806326191794:web:79fe8603e894cc9f73ebab"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);



export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();

 export const db = getFirestore(app);

