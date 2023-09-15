
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore,collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "none",
  authDomain: "hello",
  projectId: "hello",
  storageBucket: "hello",
  messagingSenderId: "hello",
  appId: "hello",
  measurementId: "hello"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
