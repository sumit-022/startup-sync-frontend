"use client";
import { useEffect, useState } from "react";
import { CompanyContext } from "@/contexts/CompanyContext";
import { Company } from "@prisma/client";
import axios from "@/config/axios.config";
import { usePathname } from "next/navigation";

export default function CompanyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const companyId = usePathname().split("/")[3];

  useEffect(() => {
    const initializeCompany = async () => {
      if (!companyId) {
        setCompany(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`/company/${companyId}`);
        setCompany(res.data.data);
      } catch (err) {
        console.error(err);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };
    initializeCompany();
  }, [companyId]);

  return (
    <CompanyContext.Provider value={{ company, setCompany, loading }}>
      {children}
    </CompanyContext.Provider>
  );
}
