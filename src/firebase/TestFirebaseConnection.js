import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const TestFirebaseConnection = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Write to Firestore
        const docRef = await addDoc(collection(db, 'testCollection'), {
          testField: 'testValue'
        });
        console.log('Document written with ID: ', docRef.id);

        // Read from Firestore
        const querySnapshot = await getDocs(collection(db, 'testCollection'));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().testField}`);
        });

        setMessage('Firebase connection successful!');
      } catch (error) {
        console.error('Error writing to Firestore: ', error);
        setMessage('Firebase connection failed. Check console for details.');
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h2>Test Firebase Connection</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestFirebaseConnection;