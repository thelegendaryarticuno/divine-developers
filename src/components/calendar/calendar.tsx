"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useTheme } from "next-themes";

const CalendarComponent = ({ date, setDate }: { date: Date | undefined; setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) => {
  const { theme } = useTheme();

  return (
    <div
      className="p-4 rounded-lg mb-3 flex items-center justify-center"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
        color: theme === "dark" ? "white" : "black",
        height: "60%",
      }}
    >
      <div className="w-[80%]">
        <h3 className="text-xl font-bold mt-1 text-center">Calendar</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border mx-auto"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
