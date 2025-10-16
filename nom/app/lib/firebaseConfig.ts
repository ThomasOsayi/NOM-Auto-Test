// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMXl-s6mcZXkt7p9SNpqel3owUi0MKThU",
  authDomain: "nom-mvp.firebaseapp.com",
  projectId: "nom-mvp",
  storageBucket: "nom-mvp.firebasestorage.app",
  messagingSenderId: "1048749333155",
  appId: "1:1048749333155:web:22f882d7f4cea8facabd16",
  measurementId: "G-04R547851W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);