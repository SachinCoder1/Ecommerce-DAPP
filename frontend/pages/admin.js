import React, { useContext } from "react";
import ErrorPage from "../components/404-page/ErrorPage";
import Admin from "../components/admin/Admin";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";

export default function admin() {
  const { accountAddress, isAdmin } = useContext(MainContext);
  return (
    <MainLayout addPM={false}>
      {accountAddress
        ? isAdmin()
          ? <Admin />
          : <ErrorPage title="You are Not The Owner" description="Contact the owner if you want to request any Product." image="/images/login-img.webp" alt="login" />
        : "Connect Wallet First"}
    </MainLayout>
  );
}
