import Icon from "@/components/atoms/icon";
import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

export type StatCardProps = {
  type: "redirect" | "default";
  icon: React.ReactNode;
  iconDirection?: "left" | "right";
  iconClassName?: string;
  title: string;
  value: string;
  path?: string;
  className?: string;
  loading?: boolean;
};

const StatContainer: React.FC<{
  type: "redirect" | "default";
  path?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ type, path, children, className }) => {
  if (type === "redirect" && path) {
    return (
      <Link
        className={`bg-white p-4 rounded-md shadow-md flex items-center justify-between hover:scale-105 transition-all duration-300 ${className}`}
        href={path}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <div
        className={`bg-white p-5 rounded-md shadow-md flex items-center justify-between hover:scale-105 transition-all duration-300 ${className}`}
      >
        {children}
      </div>
    );
  }
};

const StatCard: React.FC<StatCardProps> = ({
  type,
  path,
  icon,
  title,
  iconClassName,
  value,
  iconDirection = "left",
  loading,
  className,
}) => {
  return (
    <StatContainer type={type} path={path} className={className}>
      <div className="flex items-center gap-4">
        {iconDirection === "left" && (
          <Icon className={iconClassName} variant="contained" shape="circle">
            {icon}
          </Icon>
        )}
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
        {iconDirection === "right" && (
          <Icon className={iconClassName}>{icon}</Icon>
        )}
      </div>
      {type === "redirect" && (
        <Icon className="text-gray-400 text-2xl">
          <MdChevronRight />
        </Icon>
      )}
    </StatContainer>
  );
};

export default StatCard;
