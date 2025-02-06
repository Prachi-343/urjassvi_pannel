import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const snapshot = await db.collection('contacts').get();
      const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contact Leads</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <p>{contact.name} - {contact.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;