"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Import Clerk hook to get user info
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define a type for option
interface Option {
  label: string;
  nextStep: number | null;
}

export default function Onboarding() {
  const [step, setStep] = useState(0); // State to track the current step
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control alert dialog visibility
  const [alertType, setAlertType] = useState(""); // State to track the type of alert
  const { user } = useUser(); // Clerk's hook to get the current user
  const router = useRouter(); // Use the Next.js router

  // Content for each step
  const content = [
    {
      paragraph:
        "The Domicile Restriction under the Prime Minister's Special Scholarship Scheme (PMSSS), as outlined by AICTE, specifies that only candidates with a domicile of the Union Territories of Jammu & Kashmir and Ladakh are eligible to apply for scholarships. This initiative aims to support local students in pursuing higher education by providing financial assistance for academic fees and maintenance allowances.",
      question:
        "Are you a resident of Jammu & Kashmir and Ladakh with a domicile certificate?",
      options: [
        { label: "Yes", nextStep: 1 },
        { label: "No", nextStep: null }, // No doesn't lead to a next step; handled separately
      ],
    },
    {
      paragraph:
        "To qualify, applicants must have passed their 12th examination from recognized boards, such as J&K Board of School Education (JKBose) or CBSE.",
      question: "Do you come from CBSE / JKBose or any other board?",
      options: [
        { label: "CBSE", nextStep: null }, // Eligible for document upload
        { label: "JKBose", nextStep: null }, // Eligible for document upload
        { label: "Other", nextStep: null }, // Not eligible for the scholarship
      ],
    },
  ];

  // Handle option click based on the selected step and option
  const handleOptionClick = (option: number | null, optionLabel: string) => {
    if (step === 0) {
      if (option === null) {
        setAlertType("ineligible");
        setIsDialogOpen(true); // Open dialog if not eligible
      } else {
        setStep(option); // Proceed to the next step if eligible
      }
    } else if (step === 1) {
      // Second step logic (CBSE / JKBose / Other)
      if (optionLabel === "CBSE" || optionLabel === "JKBose") {
        setAlertType("eligible");
        setIsDialogOpen(true); // Show eligibility alert
      } else {
        setAlertType("ineligible");
        setIsDialogOpen(true); // Show ineligible alert
      }
    }
  };

  // Handle the dialog action for both eligible and ineligible cases
  const handleDialogAction = async () => {
    // Prepare onboarding data to be saved
    const onboarding = alertType; // eligible or ineligible

    try {
      // Send onboarding data to API
      await fetch("/api/saveOnboardingResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          onboarding,
          username: user?.fullName, // Retrieve user name from Clerk
        }),
      });

      // Redirect based on eligibility
      if (onboarding === "eligible") {
        router.push("/dashboard/document"); // Redirect to the document upload page
      } else {
        router.push("/"); // Redirect to the homepage for ineligible users
      }
    } catch (error) {
      console.error("Error saving onboarding results", error);
    }

    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side: Content Paragraph */}
          <div className="col-span-1">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              {content[step].paragraph}
            </p>
          </div>

          {/* Right Side: Question with Options */}
          <div className="col-span-1 flex flex-col justify-center items-center">
            <p className="text-lg font-semibold text-gray-700 mb-4 text-center">
              {content[step].question}
            </p>
            <div className="flex space-x-4">
              {content[step].options.map((option: Option, index: number) => (
                <button
                  key={index}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() =>
                    handleOptionClick(option.nextStep, option.label)
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AlertDialog for eligibility */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {alertType === "eligible"
                ? "You're Eligible to Apply"
                : "Ineligible for the Scholarship"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertType === "eligible"
                ? "Start uploading your documents to complete the application process."
                : "Unfortunately, you do not meet the eligibility criteria for this scholarship."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDialogAction}>
              {alertType === "eligible"
                ? "Proceed to Upload"
                : "Go to Homepage"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
