import { CONTRACT_ADDRESS } from "../constants";
import ContractABI from "../constants/Ecommerce.json";
import MainLayout from "../layouts/MainLayout";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Card1 from "../subcomponents/card/Card1";
import Categories from "../components/categories/Categories";
import { Typography } from "@material-tailwind/react";

export default function Home({
  AllData,
  MobileData,
  FashionData,
  ElectronicData,
  LaptopData,
  CameraData,
  ToysData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  useEffect(() => {
    switch (selectedCategory) {
      case "all":
        setSelectedCategoryData(AllData);
        break;
        case "mobile":
          setSelectedCategoryData(MobileData);
          break;
          case "fashion":
            setSelectedCategoryData(FashionData);
        break;
      case "electronics":
        setSelectedCategoryData(ElectronicData);
        break;
      case "laptop":
        setSelectedCategoryData(LaptopData);
        break;
      case "camera":
        setSelectedCategoryData(CameraData);
        break;
      case "toys":
        setSelectedCategoryData(ToysData);
        break;
      default:
        setSelectedCategoryData(AllData);
        break;
      
    }
  }, [selectedCategory]);

  return (
    <MainLayout>
      <Categories setSelectedCategory={setSelectedCategory} />
      <Typography className="mt-4" variant="h3">{selectedCategory.toUpperCase()}</Typography>
      <div className="flex mt-10 flex-wrap items-center gap-10">
        {selectedCategoryData.length
          ? selectedCategoryData.map((item, index) => (
              <Card1
                key={index}
                selectedCategory={selectedCategory}
                metadata={item.metadata}
                price={item.price}
                publishedDate={item.timeStamp}
                productId={item.productId}
              />
            ))
          : !selectedCategoryData.length && !isLoading
          ? "No Product Found"
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
  const MobileData = await getEventData("mobile");
  const FashionData = await getEventData("fashion");
  const ElectronicData = await getEventData("electronics");
  const LaptopData = await getEventData("laptop");
  const CameraData = await getEventData("camera");
  const ToysData = await getEventData("toys");

  return {
    props: {
      AllData,
      MobileData,
      FashionData,
      ElectronicData,
      LaptopData,
      CameraData,
      ToysData,
    },
  };
}
