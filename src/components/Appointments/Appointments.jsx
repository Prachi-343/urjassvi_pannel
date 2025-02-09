import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const appointmentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, []);

  const handleAccept = async (id) => {
    await deleteDoc(doc(db, 'appointments', id));
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <div className="appointments-grid">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <h3>{appointment.name}</h3>
            <p>Address: {appointment.address}</p>
            <p>Appointment Type: {appointment.appointmentType}</p>
            <p>Date: {appointment.date}</p>
            <p>Email: {appointment.email}</p>
            <p>Gender: {appointment.gender}</p>
            <p>Mobile: {appointment.mobile}</p>
            <p>Reach Method: {appointment.reachMethod}</p>
            <p>Reason: {appointment.reason}</p>
            <p>Time: {appointment.time}</p>
            <button onClick={() => handleAccept(appointment.id)} className="accept-button">Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;