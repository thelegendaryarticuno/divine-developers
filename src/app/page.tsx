// Ensure this is at the top to make Home a client component
import AboutSection from "@/components/about/about";
import FaqSection from "@/components/faq/faq";
import Hero from "@/components/hero/hero";
import ServicesSection from "@/components/servicessection/servicessection";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
    <Hero/>
    <ServicesSection/>
    <AboutSection/>
    <FaqSection/>
    </>
  );
};

export default Home;
