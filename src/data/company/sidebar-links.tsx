import { FaShoppingBag } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { BsStars } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";

type SidebarLink = {
  type: "link" | "collapse";
  name: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarLink[];
};

const sidebarLinks: SidebarLink[] = [
  {
    type: "link",
    name: "Dashboard",
    href: "/",
    icon: <BiSolidDashboard />,
  },
  {
    type: "link",
    name: "Sales",
    href: "/sales",
    icon: <FaShoppingBag />,
  },
  {
    type: "link",
    name: "Inventory",
    href: "/inventory",
    icon: <IoMdPricetag />,
  },
  {
    type: "link",
    name: "Purchase",
    href: "/purchase",
    icon: <IoMdCart />,
  },
  {
    type: "link",
    name: "Stacy AI",
    href: "/stacy",
    icon: <BsStars />,
  },
];

export default sidebarLinks;
