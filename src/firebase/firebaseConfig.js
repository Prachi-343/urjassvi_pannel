import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCgsZ_Fu80Yr-EWSgRKdNTjm9g0hMWF2QE",
  authDomain: "urjasvi-aea0f.firebaseapp.com",
  databaseURL: "https://urjasvi-aea0f-default-rtdb.firebaseio.com",
  projectId: "urjasvi-aea0f",
  storageBucket: "urjasvi-aea0f.firebasestorage.app",
  messagingSenderId: "1055226138959",
  appId: "1:1055226138959:web:b5c5178429f2eb118eb53a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };