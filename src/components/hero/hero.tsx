"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk
import RBAC from "../RBAC/rbac";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Hero = () => {
  const images = ["/hero/image1.webp", "/hero/image2.png", "/hero/image3.webp"];

  const [currentImage, setCurrentImage] = useState(0);
  const { isSignedIn } = useUser(); // Clerk hook to check if the user is signed in

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div>
      <div
        className="w-full h-[80vh] bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-40">
          <h1 className="text-white text-4xl text-center font-bold">
            Welcome to Our Website
          </h1>
          <p className="text-white text-lg mt-4">
            We offer the best services for you!
          </p>

          {/* Show the button only if the user is signed in */}
          {isSignedIn && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all">
                  Go to Dashboard
                </button>
              </DialogTrigger>
              <DialogContent>
                <div className="mt-8">
                  <RBAC />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
