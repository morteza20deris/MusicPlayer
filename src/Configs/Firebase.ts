// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE9hqmhBnrcm5MToh33wzB1bzOg7yhugU",
  authDomain: "music-player-399622.firebaseapp.com",
  projectId: "music-player-399622",
  storageBucket: "music-player-399622.appspot.com",
  messagingSenderId: "417809030997",
  appId: "1:417809030997:web:5897e183f283aeea9059dc",
  measurementId: "G-QDC4ZWEK4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Authentication = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
const analytics = getAnalytics(app);
export const db = getFirestore(app)