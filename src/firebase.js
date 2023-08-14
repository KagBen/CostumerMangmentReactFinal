// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// if we work with serverSide we shoud store in in .env file 
const firebaseConfig = {
  apiKey: "AIzaSyCX3U3-bXfAkuVYS9MGBu7X46LSoUeoYfc",
  authDomain: "store-reactfinalproject.firebaseapp.com",
  projectId: "store-reactfinalproject",
  storageBucket: "store-reactfinalproject.appspot.com",
  messagingSenderId: "792148196385",
  appId: "1:792148196385:web:3688201a60a5ab40713760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
export default db; 

