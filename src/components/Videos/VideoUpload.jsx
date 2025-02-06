import React, { useState } from 'react';
import { storage, db } from '../../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import './VideoUpload.css';

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');

  const handleUpload = async () => {
    if (video && title) {
      const storageRef = ref(storage, `videos/${video.name}`);
      await uploadBytes(storageRef, video);
      const videoURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'videos'), {
        title,
        url: videoURL,
        createdAt: Timestamp.now()
      });

      setVideo(null);
      setTitle('');
      alert('Video uploaded successfully');
    } else {
      alert('Please provide a video and a title');
    }
  };

  return (
    <div className="video-upload-container">
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <input type="text" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUpload;