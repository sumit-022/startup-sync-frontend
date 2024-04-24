"use client";
import React, { useState } from "react";
import clsx from "clsx";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  disabled,
  tooltip,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="relative">
      {tooltip && (
        <div
          className={clsx(
            "absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/65 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap transition-all duration-300",
            showTooltip ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {tooltip}
        </div>
      )}
      <button
        className={clsx(
          "p-2 rounded-full hover:bg-[#f1f1f1] transition-all duration-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:cursor-not-allowed",
          className
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick(e);
        }}
        disabled={disabled}
      >
        {icon}
      </button>
    </div>
  );
};

export default IconButton;
