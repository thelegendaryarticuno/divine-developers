"use client";

import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center my-4">
        Let&apos;s know PMSSS
      </h2>

      {/* Content: Image and Description */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto">
        {/* Left: Image */}
        <div className="lg:w-1/2 w-full p-4">
          <Image
            src="/hero/image1.jpeg"
            alt="About PMSSS"
            width={500}
            height={300}
            className="object-cover w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right: Description */}
        <div className="lg:w-1/2 w-full p-4">
          <p className="text-lg leading-relaxed">
            The Prime Minister&apos;s Special Scholarship Scheme (PMSSS) is a
            government initiative aimed at providing financial assistance to
            students from Jammu and Kashmir. This scheme facilitates education
            in prestigious institutions across the country, ensuring that
            students from the region can pursue their academic goals. PMSSS is
            designed to alleviate financial barriers, allowing students to focus
            on their studies. The initiative covers tuition fees, living
            expenses, and other educational costs. By promoting higher education
            and skill development, PMSSS helps students build a promising
            future, fostering personal growth and development in a competitive
            global environment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
