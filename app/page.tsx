"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const fetchData = async () => {
    setisLoading(true)
    try {
      const {data} = await axios.get('/api/getData');
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }finally{
      setisLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Pothole Images</h2>
      {images && images?.map((video, index) => (
        // <Image key={index} width={50} height={50} src={`data:image/jpeg;base64,${image?.buffer}`} alt="" />
        <video key={index} controls>
          <source src={`data:video/mp4;base64,${video?.buffer}`} type="video/mp4" />
        </video>
      ))}
      {
        images && images.length == 0 && <p className='text-center text-3xl'>No images found</p>
      }
      {
        isLoading && <p className='text-center text-3xl'>Loading...</p>
      }
    </>
  );
}