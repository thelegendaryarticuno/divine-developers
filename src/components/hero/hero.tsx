"use client"
import { useEffect, useState } from "react";

const Hero = () => {
  const images = [
    "/hero/image1.jpeg", 
    "/hero/image2.jpg",
    "/hero/image3.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div
      className="w-full h-[80vh] bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-40">
        <h1 className="text-white text-4xl font-bold">Welcome to Our Website</h1>
        <p className="text-white text-lg mt-4">We offer the best services for you!</p>
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
