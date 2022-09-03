import React, { useContext } from "react";
import ErrorPage from "../components/404-page/ErrorPage";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";

export default function admin() {
  const { accountAddress } = useContext(MainContext);
  return (
    <MainLayout>
      {accountAddress
        ? process.env.NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS === accountAddress
          ? "Hi owner " + accountAddress
          : <ErrorPage title="You are Not The Owner" description="Contact the owner if you want to request any Product." image="/images/login-img.webp" alt="login" />
        : "Connect Wallet First"}
    </MainLayout>
  );
}
