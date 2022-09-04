import { CONTRACT_ADDRESS } from "../constants";
import ContractABI from "../constants/Ecommerce.json";
import MainLayout from "../layouts/MainLayout";
import { ethers } from "ethers";
import { useState } from "react";
import Card1 from "../subcomponents/card/Card1";

export default function Home({ AllData }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log("All Data ", AllData);
  return (
    <MainLayout>
      <div className="flex flex-wrap items-center gap-10">
        {AllData.length
          ? AllData.map((item, index) => (
                <Card1
                key={index}
                metadata={item.metadata}
                price={item.price}
                publishedDate={item.timeStamp}
                productId={item.productId}
              />
              ))
          : !AllData.length && !isLoading
          ? "No Campaigns Found"
          : "Loading..."}
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractABI.abi,
    provider
  );

  const getEventData = async (category) => {
    const getAllProducts = contract.filters.productAdded(category);
    const AllProducts = await contract.queryFilter(getAllProducts);
    const mappedData = AllProducts.map((e) => {
      const args = e.args;
      return {
        metadata: args._metadata,
        productId: parseInt(args._productId),
        price: ethers.utils.formatEther(args._price),
        timeStamp: parseInt(args._timestamp),
      };
    });
    return mappedData;
  };

  const AllData = await getEventData(null);

  return {
    props: {
      AllData: AllData,
    },
  };
}
