// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3RIR_IGAdE7RLTgOvTsbmvIr8xmTAZTY",
  authDomain: "veu-animal.firebaseapp.com",
  projectId: "veu-animal",
  storageBucket: "veu-animal.appspot.com",
  messagingSenderId: "427146005395",
  appId: "1:427146005395:web:84c258df1e67ec69afb666"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

export default appFirebase
export { db, storage }