import React, { useState } from 'react';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './BlogUpload.css';

const BlogUpload = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    if (title && content && image) {
      try {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'blogs'), {
          title,
          content,
          imageURL,
          createdAt: Timestamp.now()
        });

        setTitle('');
        setContent('');
        setImage(null);
        alert('Blog uploaded successfully');
      } catch (error) {
        console.error("Error uploading blog: ", error);
        alert('Error uploading blog. Please try again.');
      }
    } else {
      alert('Please provide a title, content, and image for the blog');
    }
  };

  return (
    <div className="blog-upload-container">
      <h2>Upload Blog</h2>
      <input 
        type="text" 
        placeholder="Blog Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="blog-title-input"
      />
      <textarea 
        placeholder="Blog Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        className="blog-content-textarea"
      ></textarea>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImage(e.target.files[0])} 
        className="blog-image-input"
      />
      <button onClick={handleUpload} className="upload-button">Upload</button>
    </div>
  );
};

export default BlogUpload;