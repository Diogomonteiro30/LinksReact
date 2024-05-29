
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8dgGzeRxbC7o8AZrPakUBBHjeG8aw4ag",
  authDomain: "reactlinks-311e2.firebaseapp.com",
  projectId: "reactlinks-311e2",
  storageBucket: "reactlinks-311e2.appspot.com",
  messagingSenderId: "395360023157",
  appId: "1:395360023157:web:cc5917972070a73d87fe3c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }