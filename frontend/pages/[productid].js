import { ethers } from 'ethers';
import React from 'react'
import { CONTRACT_ADDRESS } from '../constants';
import ContractABI from '../constants/Ecommerce.json';
import MainLayout from '../layouts/MainLayout';

export default function Productid({ProductIdData}) {
    console.log("This is the product data -> ", ProductIdData);
  return (
    <MainLayout>
        Hello
    </MainLayout>
  )
}


export async function getStaticPaths() {
    const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractABI.abi,
        provider
    );

    const getAllProducts = contract.filters.productAdded();
    const AllProducts = await contract.queryFilter(getAllProducts);
  
    return {
      paths: AllProducts.map((e) => ({
        params: {
           productid: e.args._productId.toString(),
        },
      })),
      fallback: "blocking",
    };
  }
  
  export async function getStaticProps(context) {
    const productId = parseInt(context.params.productid);
    const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ContractABI.abi,
      provider
    );
  
    const ProductData = await contract.getProduct(productId);
    const ProductIdData = {
        productId: parseInt(productId),
        price: ethers.utils.formatEther(ProductData.price),
        qunatity: parseInt(ProductData.quantity),
        metadata: ProductData.metadata,
    };
  
    return {
      props: {
        ProductIdData,
      },
    };
  }
