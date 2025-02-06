import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await db.collection('products').get();
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (name && description && price && stock) {
      await db.collection('products').add({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        createdAt: new Date()
      });

      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      alert('Product added successfully');
    }
  };

  const handleDeleteProduct = async (id) => {
    await db.collection('products').doc(id).delete();
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h2>Product Management</h2>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Product Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <p>{product.name} - {product.description} - ${product.price} - {product.stock} in stock</p>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;