import { TbLayoutDashboard } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { AiFillCrown } from "react-icons/ai";

export const navLinks = [
  {
    title: "Dashboard",
    link: "/",
    icon: <TbLayoutDashboard />,
  },
  {
    title: "Your Past Campaigns",
    link: "/pastcampigns",
    icon: <HiTemplate />,
  },
  {
    title: "Create Campaign",
    link: "/createcampaign",
    icon: <AiFillCrown />,
  },
];
