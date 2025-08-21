// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "moodify-music-19e02.firebaseapp.com",
  projectId: "moodify-music-19e02",
  storageBucket: "moodify-music-19e02.appspot.com",
  messagingSenderId: "622122886219",
  appId: "1:622122886219:web:6d2c65c4bd8e94bcaf59ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
