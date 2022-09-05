import { ethers } from "ethers";
import React, { useState, useEffect, useContext } from "react";
import ErrorPage from "../components/404-page/ErrorPage";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";

export default function Myorders() {
  const { accountAddress, currentBlock, requestContract } = useContext(MainContext);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const Request = async () => {
      if (accountAddress) {
        try {
          setIsLoading(true);
          const contract = await requestContract();

          const getBoughtEvents = contract.filters.productBought();
          const AllBoughtProducts = await contract.queryFilter(
            getBoughtEvents,
            currentBlock - 1000,
            currentBlock
          );
          // console.log(AllBoughtProducts);
          const MyData = AllBoughtProducts.map((e) => {
            const args = e.args;
            return {
              metadata: args.metadata,
              productId: parseInt(args._productId),
              price: ethers.utils.formatEther(args.price),
              timeStamp: parseInt(args.timestamp),
            };
          });
          console.log("Buying Data -> ", MyData);
          setMyProducts(MyData);
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
