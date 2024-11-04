import React, { useState, useEffect } from 'react';
import ImageCard from './components/imageCard';
import ImageSearch from './components/imageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`);
        const data = await response.json();
        setImages(data.hits);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [term]); // Dependency array includes term, fetches data only when term changes

  return (
    <div className="container mx-auto p-5">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className="text-center text-xl font-semibold text-gray-700 mt-10">
          No images found for the term <span className="font-bold text-purple-500">{term}</span>
        </h1>
      )}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {images.map(image => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
