import React, { useContext } from "react";
import ErrorPage from "../components/404-page/ErrorPage";
import Admin from "../components/admin/Admin";
import AdminDashboard from "../components/admin/AdminDashboard";
import TabComp from "../components/admin/TabComp";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";

export default function AdminPage() {
  const { accountAddress, isAdmin } = useContext(MainContext);
  const tabData = [
    {
      label: "Add Product",
      value: "addproduct",
      desc: <Admin />
    },
    {
      label: "Admin Dashboard",
      value: "admindashboard",
      desc: <AdminDashboard />
    },
  ];


  
  return (
    <MainLayout addPM={false}>
      {accountAddress
        ? isAdmin()
          ?  <div className="my-5 py-5 md:px-3 md:w-4/6 md:mx-auto mx-3">
          <TabComp data={tabData} />
        </div>
          : <ErrorPage title="You are Not The Owner" description="Contact the owner if you want to request any Product." image="/images/login-img.webp" alt="login" />
        : <ErrorPage title="Connect Wallet First !" description="Connecting Your Wallet will give you a Super Power to Buy the Order, See The Order." image="/images/login-img.webp" alt="login" />}
    </MainLayout>
  );
}
