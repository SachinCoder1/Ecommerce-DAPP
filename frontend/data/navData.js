import { TbLayoutDashboard } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { AiFillCrown } from "react-icons/ai";
import { urls } from "../constants";

export const navLinks = [
  {
    title: "Dashboard",
    link: urls.home,
    icon: <TbLayoutDashboard />,
  },
  {
    title: "Your Past Orders",
    link: urls.pastOrders,
    icon: <HiTemplate />,
  },
  {
    title: "Admin",
    link: urls.admin,
    icon: <AiFillCrown />,
  },
];
