/** @format */

import React from "react";

const AngularButterfly = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* Left Wing - Top */}
      <path d="M12 12L6 4L4 10L8 12Z" />
      {/* Left Wing - Bottom */}
      <path d="M12 12L4 14L6 20L8 16Z" />
      {/* Right Wing - Top */}
      <path d="M12 12L18 4L20 10L16 12Z" />
      {/* Right Wing - Bottom */}
      <path d="M12 12L20 14L18 20L16 16Z" />
      {/* Body */}
      <line x1="12" y1="12" x2="12" y2="20" />
      {/* Antennae */}
      <path d="M12 4L10 2" />
      <path d="M12 4L14 2" />
    </svg>
  );
};

export default AngularButterfly;
