"use client";

import React from "react";
import { useTheme } from "next-themes";

const ChatBot = () => {
  const { theme } = useTheme();

  return (
    <div
      className="p-4 rounded-lg flex items-center justify-center"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
        color: theme === "dark" ? "white" : "black",
        height: "37%",
      }}
    >
      <div className="w-[80%]">
        <h3 className="text-xl font-bold mb-4 text-center">Chat Bot</h3>
        <div className="mt-4 text-center">
          <p>Chat Bot Content</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
