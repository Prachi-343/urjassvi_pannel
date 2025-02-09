import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const reviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'reviews', id));
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div className="reviews-container">
      <h2>Client Reviews</h2>
      <div className="reviews-grid">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <h3>{review.name}</h3>
            <p>{review.review}</p>
            <button onClick={() => handleDelete(review.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;