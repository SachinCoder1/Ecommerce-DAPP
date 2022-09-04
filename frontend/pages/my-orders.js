import React, { useState, useEffect, useContext } from "react";
import ErrorPage from "../components/404-page/ErrorPage";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";

export default function Myorders() {
  const { accountAddress } = useContext(MainContext);
  
  return (
    <MainLayout>
      {accountAddress ? (
        "Hey"
      ) : (
        <ErrorPage
          title="Connect Wallet First"
          description="Please Connect Wallet first to check your Past Orders or To Buy Product."
          image="/images/connect-wallet.png"
          alt="Connect Wallet"
        />
      )}
    </MainLayout>
  );
}
