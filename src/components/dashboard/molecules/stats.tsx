import StatCard from "../atoms/stat-card";
import { FaStar } from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { IoMdEye } from "react-icons/io";

export default function Stats({ company_count }: { company_count: number }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <StatCard
        title="Companies"
        value={company_count.toString()}
        icon={<HiMiniBuildingOffice2 />}
        type="default"
      />
      <StatCard
        title="Top Performing Company"
        value="20"
        icon={<FaStar />}
        type="default"
      />
      <StatCard
        title="Most Viewed Company"
        value="N/A"
        icon={<IoMdEye />}
        type="default"
      />
    </div>
  );
}
