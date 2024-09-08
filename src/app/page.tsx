// Ensure this is at the top to make Home a client component
import SimpleNavbar from "@/components/Header/header"; // Correctly import from the file
import React from "react";

const Home: React.FC = () => {
  return (
    <>
    <SimpleNavbar/>
    <h1 className="text-white">This  is the Home page</h1>
      
    </>
  );
};

export default Home;
