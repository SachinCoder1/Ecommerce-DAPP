import { Button } from "@material-tailwind/react";
import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import ProductDetail from "../components/product-details/ProductDetail";
import { CONTRACT_ADDRESS, urls } from "../constants";
import ContractABI from "../constants/Ecommerce.json";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Productid({ ProductIdData }) {
  const router = useRouter();
  const { accountAddress, requestContract } = useContext(MainContext);
  const [quantityInput, setQuantityInput] = useState("");
  const [open, setOpen] = useState(false);

  const transferFund = async () => {
    try {
      toast.info("Wait...");
      const contract = await requestContract();

      const transaction = await contract.buyProduct(ProductIdData.productId, {
        value: ethers.utils.parseEther(ProductIdData.price),
      });
      toast.promise(transaction.wait(), {
        pending: "Wait...",
        success: "Product Bought Successfully! 👌",
        error: "Some Error Occured. 🤯",
      });
      await transaction.wait();
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured. 🤯");
    }
  };

  const updateProductByAdmin = async () => {
    try {
      if (!quantityInput) {
        toast.error("Enter Quantity Value...");
        return;
      }
      setOpen(false);
      toast.info("Wait...");

      const contract = await requestContract();
      const tx = await contract.updateQuantity(
        quantityInput,
        ProductIdData.productId
      );
      toast.promise(tx.wait(), {
        pending: "Wait...",
        success: "Product Quantity Updated Successfully! 👌",
        error: "Some Error Occured. 🤯",
      });
      await tx.wait();
      setQuantityInput("");
      router.push(urls.pastOrders);
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured. Please try again 🤯");
    }
  };

  return (
    <MainLayout>
      <ToastContainer autoClose={2500} />
      <ProductDetail
        open={open}
        setOpen={setOpen}
        updateProduct={updateProductByAdmin}
        quantityInput={quantityInput}
        setQuantityInput={setQuantityInput}
        productId={ProductIdData?.productId}
        metadata={ProductIdData?.metadata}
        price={ProductIdData?.price}
        quantity={ProductIdData?.quantity}
      >
        {accountAddress ? (
          <>
            <Button
              onClick={() => transferFund()}
              className="flex items-center justify-center text-base gap-x-2 bg-primary"
              fullWidth
              disabled={!accountAddress}
            >
              Buy Now
              <AiOutlineArrowRight className="text-2xl" />
            </Button>
          </>
        ) : (
          "Connect Wallet to Buy"
        )}
      </ProductDetail>
    </MainLayout>
  );
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
    quantity: parseInt(ProductData.quantity),
    metadata: ProductData.metadata,
  };

  return {
    props: {
      ProductIdData,
    },
  };
}
