"use client";
import React from "react";

const variants = {
  contained: "bg-pallete1-headercaption/60 p-2",
  outlined: "border border-pallet1-headercaption p-2",
  normal: "",
};

const shapes = {
  circle: "rounded-full",
  square: "rounded-none",
  curved: "rounded-md",
};

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  shape?: keyof typeof shapes;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  children,
  variant = "normal",
  className,
  shape = "square",
}) => {
  return (
    <div className={`${variants[variant]} ${shapes[shape]} ${className}`}>
      {children}
    </div>
  );
};

export default Icon;
