
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore,collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAhykMjEvjKsPgFYGMNZHSvfyTtHi-J0Q8",
  authDomain: "react-notes-714a8.firebaseapp.com",
  projectId: "react-notes-714a8",
  storageBucket: "react-notes-714a8.appspot.com",
  messagingSenderId: "428633443033",
  appId: "1:428633443033:web:65dc7f51a5342e74a3ccc8",
  measurementId: "G-XTDL8N6NVH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")