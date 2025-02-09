import React, { useState } from 'react';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './ProductUpload.css';

const ProductUpload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleUpload = async () => {
    if (name && description && price && stock && photo) {
      const storageRef = ref(storage, `products/${photo.name}`);
      await uploadBytes(storageRef, photo);
      const photoURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'products'), {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        photoURL,
        createdAt: new Date()
      });

      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setPhoto(null);
      alert('Product uploaded successfully');
    }
  };

  return (
    <div className="product-upload-container">
      <h2>Upload Product</h2>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Product Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Product</button>
    </div>
  );
};

export default ProductUpload;
