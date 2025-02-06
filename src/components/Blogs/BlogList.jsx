import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
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

  return (
    <div className="blog-list-container">
      <h2>All Blogs</h2>
      <Link to="/blogs/upload" className="add-blog-button">Add Blog</Link>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <img src={blog.imageURL} alt={blog.title} className="blog-image" />
            <p>{blog.content}</p>
            {blog.createdAt && (
              <p className="blog-date">
                {new Date(blog.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;