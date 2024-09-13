"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const CalendarComponent = () => {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Current month
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Current year
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Default to current date

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Navigate to the previous month
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // Go to December of the previous year
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // Go to January of the next year
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  // Function to render the days in a month
  const renderDaysInMonth = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Number of days in the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // First day of the month

    const days = [];

    // Add empty cells for days of the previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1" />);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate?.toDateString() === currentDate.toDateString();
      const isToday = new Date().toDateString() === currentDate.toDateString();

      days.push(
        <div
          key={day}
          className={`p-1 text-center cursor-pointer rounded-md text-sm w-8 h-8 flex items-center justify-center ${
            isSelected
              ? "bg-blue-500 text-white"
              : isToday
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => handleDateClick(currentDate)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Array for month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div
      className="p-3 rounded-lg mb-3 flex flex-col items-center w-full max-w-md mx-auto"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
        color: theme === "dark" ? "white" : "black",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}
    >
      {/* Calendar Header with Month, Year, and Arrows */}
      <div className="flex items-center justify-between w-full max-w-sm mb-4">
        <button
          className="px-2 py-1 text-lg bg-gray-300 dark:bg-gray-600 rounded-md"
          onClick={handlePreviousMonth}
        >
          &larr;
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          className="px-2 py-1 text-lg bg-gray-300 dark:bg-gray-600 rounded-md"
          onClick={handleNextMonth}
        >
          &rarr;
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-1 text-center font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Render Days of the Current Month */}
      <div className="grid grid-cols-7 gap-1">{renderDaysInMonth()}</div>
    </div>
  );
};

export default CalendarComponent;
