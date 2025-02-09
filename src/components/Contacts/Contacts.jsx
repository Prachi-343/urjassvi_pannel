import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const contactsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const handleAccept = async (id) => {
    await deleteDoc(doc(db, 'contacts', id));
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="contacts-container">
      <h2>Contact Leads</h2>
      <div className="contacts-grid">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <h3>{contact.first_name} {contact.last_name}</h3>
            <p>Email: {contact.email}</p>
            <p>Subject: {contact.subject}</p>
            <p>Message: {contact.message}</p>
            <button onClick={() => handleAccept(contact.id)} className="accept-button">Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;