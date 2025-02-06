import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const snapshot = await db.collection('appointments').get();
      const appointmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <p>{appointment.date} - {appointment.clientName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;