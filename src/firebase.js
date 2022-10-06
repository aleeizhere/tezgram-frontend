// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfYaROIJkF-5VXiT47pH9EFG1WY45XEZc",
  authDomain: "tezgram-imagedb.firebaseapp.com",
  projectId: "tezgram-imagedb",
  storageBucket: "tezgram-imagedb.appspot.com",
  messagingSenderId: "1074460606536",
  appId: "1:1074460606536:web:608af9f8ee90300c33987d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
