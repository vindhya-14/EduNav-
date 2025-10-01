import React from "react";

export const Progress = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded ${className}`}>
    <div
      style={{ width: `${value}%` }}
      className="bg-purple-500 h-2 rounded transition-all"
    />
  </div>
);
