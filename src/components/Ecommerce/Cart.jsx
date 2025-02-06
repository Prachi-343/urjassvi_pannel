import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const snapshot = await db.collection('cart').get();
      const cartData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCartItems(cartData);
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Cart Management</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <p>{item.productName} - {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;