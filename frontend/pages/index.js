import Head from "next/head";
import Image from "next/image";
import { CONTRACT_ADDRESS } from "../constants";
import ContractABI from "../constants/Ecommerce.json";
import { categories } from "../data";
import MainLayout from "../layouts/MainLayout";
import { ethers } from "ethers";

export default function Home({AllData}) {
  console.log("All Data ", AllData)
  return <MainLayout></MainLayout>;
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
        _price: ethers.utils.formatEther(args._price),
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
