import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAA76FFI3hj--sBs1Mvl3ksqFWd4YtpTqI",
  authDomain: "four-ea12b.firebaseapp.com",
  projectId: "four-ea12b",
  storageBucket: "four-ea12b.appspot.com",
  messagingSenderId: "781851642439",
  appId: "1:781851642439:web:3bc8dd014501167ad27f62"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };