import React from "react";

const CompanyDetailSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="flex flex-col space-y-2">
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default CompanyDetailSkeleton;
