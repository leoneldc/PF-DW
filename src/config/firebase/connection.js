import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxmS3Z4aXDDEs_WvQ1a4PtI4ormZLOVXA",
  authDomain: "umg-bd.firebaseapp.com",
  projectId: "umg-bd",
  storageBucket: "umg-bd.appspot.com",
  messagingSenderId: "162986407719",
  appId: "1:162986407719:web:213eae6397a876174c9b02",
  measurementId: "G-5XXY3YQB80",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);