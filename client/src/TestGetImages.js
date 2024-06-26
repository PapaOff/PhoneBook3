import React, { useState } from 'react';
import { getImages } from './getImages';

function TestGetImages() {
  const [userId, setUserId] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetImages = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const urls = await getImages(userId);
      setImageUrls(urls);
    } catch (error) {
      alert('Failed to fetch images');
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
      <button onClick={handleGetImages} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Images'}
      </button>
      <div>
        {imageUrls.length > 0 && (
          <div>
            <h3>Images for User: {userId}</h3>
            <ul>
              {imageUrls.map((url, index) => (
                <li key={index}>
                  <img src={url} alt={`User Image ${index + 1}`} width="200" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestGetImages;
