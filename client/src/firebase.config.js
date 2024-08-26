import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUcFkWgb1p3Z7ndS22SOzjI9V93oUljOk",
  authDomain: "learning-portal-a24ec.firebaseapp.com",
  projectId: "learning-portal-a24ec",
  storageBucket: "learning-portal-a24ec.appspot.com",
  messagingSenderId: "1089512874762",
  appId: "1:1089512874762:web:776ac21b7f54bfedd790f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };