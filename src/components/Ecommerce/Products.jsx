import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [photo, setPhoto] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
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
      alert('Product added successfully');
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditProduct = async (id) => {
    const product = products.find(product => product.id === id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setEditId(id);
  };

  const handleUpdateProduct = async () => {
    if (editId) {
      const productRef = doc(db, 'products', editId);
      await updateDoc(productRef, {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10)
      });

      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setEditId(null);
      alert('Product updated successfully');
    }
  };

  return (
    <div className="products-container">
      <h2>Product Management</h2>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Product Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      {editId ? (
        <button onClick={handleUpdateProduct}>Update Product</button>
      ) : (
        <button onClick={handleAddProduct}>Add Product</button>
      )}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.photoURL} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <p>{product.stock} in stock</p>
            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;