"use client";

import React, { useState, useEffect } from "react";
import SkeletonRow from "@/components/atoms/skeletons/tableRow";
import useCompany from "@/hooks/useCompany";
import type { Company } from "@prisma/client";
import Image from "next/image";
import axios from "@/config/axios.config";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const variants = {
  even: "bg-gray-50",
  odd: "bg-white",
};

const companyColumnHeadings = [
  "Name",
  "Website",
  "Active Queries",
  "Total Queries",
  "GSTIN",
  "Created At",
];

const CompanyTable = () => {
  const router = useRouter();
  const { setCompany } = useCompany();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/company/mine")
      .then((res) => {
        setCompanies(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <table className="min-w-full divide-y bg-white rounded-md divide-gray-200">
      <thead className="">
        <tr>
          {companyColumnHeadings.map((heading) => (
            <th
              key={heading}
              scope="col"
              className="px-6 py-3 text-left text-xs text-pallete1-headersmall font-semibold uppercase tracking-wider"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={clsx("bg-white divide-y divide-gray-200")}>
        {loading
          ? Array.from({ length: 10 }, (_, index) => (
              <SkeletonRow key={index} />
            ))
          : companies.map((company, index) => (
              <tr
                key={company.id}
                className={
                  (variants[index % 2 === 0 ? "even" : "odd"], "cursor-pointer")
                }
                onClick={() => {
                  setCompany(company);
                  router.push(`/dashboard/company/${company.id}`);
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={company.logo}
                        alt="Company Logo"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {company.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {company.website}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {company.gstin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(company.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;
