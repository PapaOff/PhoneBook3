export async function getImages(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
  
    try {
      const response = await fetch(`http://localhost:8083/images/${userId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
  
      const urls = await response.json();
      console.log('Fetched URLs:', urls);
      return urls;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
  