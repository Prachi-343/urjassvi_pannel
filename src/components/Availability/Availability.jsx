import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Availability.css';

const Availability = () => {
  const [availability, setAvailability] = useState('Unavailable');

  useEffect(() => {
    const fetchAvailability = async () => {
      const docRef = doc(db, 'availability', 'current');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAvailability(docSnap.data().status);
      }
    };

    fetchAvailability();
  }, []);

  const handleChange = async (status) => {
    const docRef = doc(db, 'availability', 'current');
    await setDoc(docRef, { status });
    setAvailability(status);
  };

  return (
    <div className="availability-container">
      <h2>Daily Availability</h2>
      <p>Current Status: {availability}</p>
      <button className="available-button" onClick={() => handleChange('Available')}>Available</button>
      <button className="unavailable-button" onClick={() => handleChange('Unavailable')}>Unavailable</button>
    </div>
  );
};

export default Availability;