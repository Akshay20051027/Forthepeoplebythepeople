
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD0Zc_ZhPPo4qsF2QIvML7apUZiDdk7bB4",
  authDomain: "disastermangement-844a7.firebaseapp.com",
  projectId: "disastermangement-844a7",
  storageBucket: "disastermangement-844a7.firebasestorage.app",
  messagingSenderId: "606485104142",
  appId: "1:606485104142:web:3647905343dc5ae641de5f",
  measurementId: "G-2QVHBZPXSG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
