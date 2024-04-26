"use client";
import Image from "next/image";
import useCompany from "@/hooks/useCompany";
import { useAuth } from "@/contexts/AuthContext";
import CompanyDetailSkeleton from "../atoms/skeletons/company-skeleton";
import { usePathname, useRouter } from "next/navigation";
import sidebarLinks from "@/data/company/sidebar-links";
import Link from "next/link";
import clsx from "clsx";
import UserSkeleton from "../atoms/skeletons/user-skeleton";
import { FiLogOut } from "react-icons/fi";
import { TiArrowLeft } from "react-icons/ti";
import IconButton from "@/components/atoms/icon-button";
import axios from "@/config/axios.config";

export default function CompanySidebar() {
  const { company, loading } = useCompany();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname().concat("/");
  const basePath = pathname.split("/").slice(0, 4).join("/") || "/";
  const activePath = "/".concat(pathname.split("/")[4]) || "/";

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <aside className="bg-white border-r grid grid-rows-[110px,1fr,auto] border-gray-200 h-full w-64 max-w-64">
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
              <h3 className="text-lg font-semibold line-clamp-2 ">
                {company?.name}
              </h3>
              <small className="text-gray-400">{company?.email}</small>
            </div>
          </>
        )}
      </div>
      <nav className="mt-4 overflow-scroll">
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
      <footer className="p-4 text-center border-t">
        {isLoading ? (
          <UserSkeleton />
        ) : (
          user && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image
                  src={"https://ui-avatars.com/api/?name=".concat(user.name)}
                  alt={user.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div className="flex ml-3 flex-col">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {user.name}
                  </h3>
                  <small>{user.email}</small>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <IconButton
                  onClick={() => router.push("/dashboard")}
                  className="text-blue-500"
                  icon={<TiArrowLeft />}
                  tooltip="Exit to Dashboard"
                />
                <IconButton
                  onClick={handleLogout}
                  className="text-red-500"
                  icon={<FiLogOut />}
                  tooltip="Logout"
                />
              </div>
            </div>
          )
        )}
      </footer>
    </aside>
  );
}
