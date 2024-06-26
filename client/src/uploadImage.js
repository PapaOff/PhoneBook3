export async function uploadImage(userId, imageFile) {
    if (!userId || !imageFile) {
      throw new Error('User ID and image file are required');
    }
  
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('userId', userId);
  
    try {
      const response = await fetch('http://localhost:8083/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
  