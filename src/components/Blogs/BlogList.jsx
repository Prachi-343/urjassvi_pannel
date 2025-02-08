import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsList);
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'blogs', id));
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div className="blog-list-container">
      <h2>All Blogs</h2>
      <Link to="/blogs/upload" className="add-blog-button">Add Blog</Link>
      <div className="blog-grid">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <img src={blog.imageURL} alt={blog.title} className="blog-image" />
            <p>{blog.content}</p>
            {blog.createdAt && (
              <p className="blog-date">
                {new Date(blog.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
            )}
            <button onClick={() => handleDelete(blog.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;