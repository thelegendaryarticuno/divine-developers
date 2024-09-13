"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FaqSection = () => {
  // State to manage open/close of FAQ items
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Function to toggle the selected FAQ
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="w-full my-4 p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>

      {/* Grid container with responsive classes */}
      <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow-md"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              {openFaq === index ? (
                <FaMinus className="text-lg" />
              ) : (
                <FaPlus className="text-lg" />
              )}
            </div>
            {openFaq === index && (
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// FAQ Data
const faqData = [
  {
    question: "What is PMSSS?",
    answer:
      "PMSSS stands for Prime Ministers Special Scholarship Scheme, which provides financial support to students from Jammu and Kashmir for pursuing higher education in institutions across India.",
  },
  {
    question: "Who is eligible for PMSSS?",
    answer:
      "Students who are domiciles of Jammu and Kashmir and have passed 12th grade from a recognized board are eligible for the PMSSS program, provided they meet the other specific criteria.",
  },
  {
    question: "How can I apply for PMSSS?",
    answer:
      "Students can apply for PMSSS through the official website of the All India Council for Technical Education (AICTE) during the admission period by filling out an online application form.",
  },
  {
    question: "What expenses does PMSSS cover?",
    answer:
      "PMSSS covers tuition fees, living expenses, and other incidental charges to ensure that students can focus on their studies without financial burden.",
  },
];

export default FaqSection;
