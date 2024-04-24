"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoIosAdd } from "react-icons/io";

const AddCompanyCard = () => {
  const router = useRouter();
  return (
    <div
      className="rounded-lg shadow-md p-3 flex items-center justify-center cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 transition-all duration-300 text-white"
      onClick={() => router.push("/dashboard/company/new")}
    >
      <div className="flex items-center justify-center gap-2">
        <IoIosAdd size={32} />
        <p className="text-lg font-semibold">Add Company</p>
      </div>
    </div>
  );
};

export default AddCompanyCard;
