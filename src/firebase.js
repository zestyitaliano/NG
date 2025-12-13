// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM5-f-NH1L1WGdthb-EL0k-YJjtxDj_e8",
  authDomain: "no-gatekeeping.firebaseapp.com",
  projectId: "no-gatekeeping",
  storageBucket: "no-gatekeeping.firebasestorage.app",
  messagingSenderId: "1073012496622",
  appId: "1:1073012496622:web:7491668c61921281f4fbff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
