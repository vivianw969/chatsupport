// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Xetumk6Kr4nTg6blXnVWQc_lt-8SEaM",
  authDomain: "ai-chat-assistant-58232.firebaseapp.com",
  projectId: "ai-chat-assistant-58232",
  storageBucket: "ai-chat-assistant-58232.appspot.com",
  messagingSenderId: "1026545403838",
  appId: "1:1026545403838:web:bb008d35b9154e9a525bef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  { auth, db };
