import React from "react";

const UserSkeleton = () => {
  return (
    <div className="flex items-center">
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      <div className="flex ml-3 gap-2 flex-col">
        <h3 className="text-lg w-24 h-4 rounded-md font-semibold line-clamp-2 bg-gray-300"></h3>
        <small className="text-gray-400 w-16 h-4 rounded-md bg-gray-300"></small>
      </div>
    </div>
  );
};

export default UserSkeleton;
