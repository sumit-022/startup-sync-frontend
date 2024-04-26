"use client";
import Image from "next/image";
import useCompany from "@/hooks/useCompany";
import CompanyDetailSkeleton from "../atoms/skeletons/company-skeleton";
import { usePathname } from "next/navigation";
import sidebarLinks from "@/data/company/sidebar-links";
import Link from "next/link";
import clsx from "clsx";

export default function CompanySidebar() {
  const { company, loading } = useCompany();
  const pathname = usePathname().concat("/");
  const basePath = pathname.split("/").slice(0, 4).join("/") || "/";
  const activePath = "/".concat(pathname.split("/")[4]) || "/";
  return (
    <aside className="bg-white border-r border-gray-200 h-full w-64 max-w-64">
      <div className="p-4 grid grid-cols-[auto,1fr] items-center">
        {loading ? (
          <CompanyDetailSkeleton />
        ) : (
          <>
            {company?.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={48}
                height={48}
                className="rounded-md"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
            )}
            <div className="flex ml-3 flex-col">
              <h3 className="text-lg font-semibold">{company?.name}</h3>
              <small className="text-gray-400">{company?.email}</small>
            </div>
          </>
        )}
      </div>
      <nav className="mt-4">
        <ul>
          {sidebarLinks.map((link) =>
            link.type === "link" && link.href ? (
              <Link key={link.name} href={`${basePath}/${link.href}`}>
                <li
                  className={clsx(
                    "p-5 flex items-center hover:bg-gray-100",
                    activePath === link.href && "bg-gray-100"
                  )}
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </li>
              </Link>
            ) : (
              <li
                key={link.name}
                className={clsx(
                  "p-5 hover:bg-gray-100",
                  activePath === link.href && "bg-gray-100"
                )}
              >
                <button className="flex items-center">
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
}
