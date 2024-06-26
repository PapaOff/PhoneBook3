import React, { useState } from 'react';
import { uploadImage } from './uploadImage';

function TestUpload() {
  const [imageUpload, setImageUpload] = useState(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!imageUpload || !userId) return;

    try {
      setLoading(true);
      const imageUrl = await uploadImage(userId, imageUpload);
      alert(`Image uploaded successfully: ${imageUrl}`);
    } catch (error) {
      alert('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}

export default TestUpload;
