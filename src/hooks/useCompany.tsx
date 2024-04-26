import { CompanyContext } from "@/contexts/CompanyContext";
import { useContext } from "react";

export default function useCompany() {
  const { company, setCompany, loading } = useContext(CompanyContext);
  return { company, loading, setCompany };
}
