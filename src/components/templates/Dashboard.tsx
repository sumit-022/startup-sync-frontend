import DashboardLayout from "@/components/dashboard/layout";
import CompanyTable from "../dashboard/molecules/companyTable";
import Stats from "../dashboard/molecules/stats";
import AddCompanyCard from "../dashboard/molecules/addCompany";

const DashboardTemplate = {
  Layout: DashboardLayout,
  Table: CompanyTable,
  AddCompany: AddCompanyCard,
  Stats,
};

export default DashboardTemplate;
