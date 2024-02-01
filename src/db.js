// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_fX8RqveHNV16Vw_9aymEY-A320jQRho",
  authDomain: "qmaze-aaef6.firebaseapp.com",
  databaseURL: "https://qmaze-aaef6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qmaze-aaef6",
  storageBucket: "qmaze-aaef6.appspot.com",
  messagingSenderId: "67259567635",
  appId: "1:67259567635:web:d12fec2634f7d2072db9e6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app);