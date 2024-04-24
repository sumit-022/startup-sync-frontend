import React from "react";
import clsx from "clsx";
import Header from "./header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#f0ede6] grid grid-rows-[auto,1fr] h-screen overflow-hidden">
      <Header />
      <main className={clsx("overflow-y-auto px-14 py-4")}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
