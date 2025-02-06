import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await db.collection('reviews').get();
      const reviewsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    await db.collection('reviews').doc(id).delete();
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div>
      <h2>Client Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.text}</p>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;