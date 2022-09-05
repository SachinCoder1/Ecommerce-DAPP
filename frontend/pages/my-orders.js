import { ethers } from "ethers";
import React, { useState, useEffect, useContext } from "react";
import ErrorPage from "../components/404-page/ErrorPage";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";
import Card1 from "../subcomponents/card/Card1";

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

          const getBoughtEvents = contract.filters.productBought(accountAddress);
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
        <div className="flex flex-wrap items-center gap-10">
        {myProducts.length
          ? myProducts.map((item, index) => (
                <Card1
                key={index}
                metadata={item.metadata}
                price={item.price}
                publishedDate={item.timeStamp}
                productId={item.productId}
              />
              ))
          : !myProducts.length && !isLoading
          ? <ErrorPage
          title="No Products Found"
          description="Buy some products... If you are concerned About Money then check our T-Shirts because it's affordable to start with."
          image="/images/logo.jpg"
          alt="Connect Wallet"
        />
          : "Loading..."}
      </div>
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
