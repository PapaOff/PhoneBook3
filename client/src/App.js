import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImageUrls = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/images');
      const urls = await response.json();
      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (imageUpload == null) return;

    const formData = new FormData();
    formData.append('image', imageUpload);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchImageUrls();
        alert('Image uploaded successfully');
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImageUrls();
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {loading && <p>Loading...</p>}
      {imageUrls.map((url) => (
        <img key={url} src={url} alt="uploaded" />
      ))}
    </div>
  );
}

export default App;
