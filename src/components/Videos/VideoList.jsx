import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, 'videos'));
      const videosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(videosList);
    };

    fetchVideos();
  }, []);

  const handleDelete = async (id, url) => {
    const videoRef = ref(storage, url);
    await deleteObject(videoRef);
    await deleteDoc(doc(db, 'videos', id));
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <div className="video-list-container">
      <h2>Uploaded Videos</h2>
      <Link to="/videos/upload" className="upload-button">Upload Video</Link>
      <ul>
        {videos.map(video => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={() => handleDelete(video.id, video.url)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;