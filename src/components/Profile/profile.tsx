"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { useTheme } from "next-themes";

const Profile = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <div
      className="p-4 rounded-lg mb-4 flex items-center space-x-4"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
        color: theme === "dark" ? "white" : "black",
        width: "100%",
      }}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
        <UserButton />
      </div>
      <div>
        <h2 className="text-xl font-bold">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-500">New York, USA</p>
        <p className="text-gray-500">not yet!</p>
      </div>
    </div>
  );
};

export default Profile;
