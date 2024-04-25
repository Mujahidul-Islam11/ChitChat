import { initializeApp } from "firebase/app";  
import { getAuth } from "firebase/auth";             
import { getFirestore } from "firebase/firestore";             
import { getStorage } from "firebase/storage";             

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chitchat-2a249.firebaseapp.com",
  projectId: "chitchat-2a249",
  storageBucket: "chitchat-2a249.appspot.com",
  messagingSenderId: "244026965798",
  appId: "1:244026965798:web:37dcea360dbc9be9890be7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(); 
export const db = getFirestore(); 
export const storage = getStorage(); 