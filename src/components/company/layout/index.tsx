import React from "react";
import CompanySidebar from "./sidebar";

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen grid grid-cols-[auto,1fr] overflow-hidden">
      <CompanySidebar />
      <main className="h-full bg-pallete1-background overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default CompanyLayout;
