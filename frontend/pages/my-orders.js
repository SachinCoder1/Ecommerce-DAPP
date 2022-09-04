import React, { useState, useEffect, useContext } from "react";
import ErrorPage from "../components/404-page/ErrorPage";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";

export default function Myorders() {
  const { accountAddress, requestContract } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const Request = async () => {
      if (accountAddress) {
        try {
          setIsLoading(true);
          const contract = await requestContract();

          const getBoughtEvents = contract.filters.productBought(
            accountAddress
          );
          const AllBoughtProducts = await contract.queryFilter(getBoughtEvents);
          const MyData = AllBoughtProducts.map((e) => {
            return {
              title: e.args._title,
              description: e.args._description,
              image: e.args._image,
              owner: e.args._campaignOwner,
              timeStamp: parseInt(e.args._timestamp),
              amount: ethers.utils.formatEther(e.args._requiredAmount),
              address: e.args._campaignAddress,
            };
          });
          setMyCampaigns(MyData);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log("error....", error);
        }
      }
    };
    Request();
  }, [accountAddress]);
  
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
