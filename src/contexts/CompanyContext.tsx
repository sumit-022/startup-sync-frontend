import { createContext } from "react";
import type { Company } from "@prisma/client";

export type CompanyContextType = {
  company: Company | null;
  setCompany: (company: Company | null) => void;
  loading: boolean;
};

export const CompanyContext = createContext<CompanyContextType>({
  company: null,
  setCompany: () => {},
  loading: true,
});
