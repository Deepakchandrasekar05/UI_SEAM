import React from "react";
import { Logo } from "./Logo"; // Assuming your original Logo component is imported

export const Header: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between", // Space logos to the left and right
        alignItems: "center", // Ensures vertical alignment of logos
        padding: "16px",
      }}
    >
      {/* Old Logo on the left */}
      <Logo className="h-16" style={{ height: "64px" }} />{" "}
      {/* Set the height for the Logo component */}
      {/* New Logo on the right */}
      <img
        src="/new-logo.png" // Correct file name and path
        alt="New Logo"
        style={{
          height: "64px", // Set consistent height
          objectFit: "contain", // Ensures image maintains its aspect ratio
          margin: 0, // Ensure there's no unwanted margin
          padding: 0, // Remove any padding
        }}
      />
    </div>
  );
};
