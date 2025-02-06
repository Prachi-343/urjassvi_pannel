import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await db.collection('orders').get();
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order Management</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Client: {order.clientName}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;