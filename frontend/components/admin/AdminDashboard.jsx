import { Button, Input, Typography } from "@material-tailwind/react";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { MainContext } from "../../context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const [isAdminWithdrawing, setIsAdminWithdrawing] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [contractBalance, setContractBalance] = useState("Wait..");
  const { requestContract } = useContext(MainContext);

  const getContractBalance = async () => {
    const contract = await requestContract();
    const getBalance = await contract.getContractBalance();
    const formatEther = ethers.utils.formatEther(getBalance);
    // console.log(formatEther);
    setContractBalance(formatEther);
    return formatEther;
  };
  useEffect(() => {
    getContractBalance();
  }, []);

  const withdrawMoney = async () => {
    if (!withdrawAddress) return;
    try {
      toast.info("Wait..");
      const contract = await requestContract();
      const tx = await contract.withdraw(withdrawAddress);
      toast.promise(tx.wait(), {
        pending: "Wait...",
        success: "Money Withdraw Success to Address -> " + withdrawAddress,
        error: "Some Error Occured. 🤯",
      });
      await tx.wait();
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured. 🤯");
    }
  };
  return (
    <div className="space-y-10">
      <ToastContainer autoClose={2500} />
      <Typography variant="h3">Admin Dashobard</Typography>
      <div className="bg-white h-50 md:w-5/6 mx-auto p-10 md:m-0 m-1">
        <Typography
          className="md:flex gap-x-2 items-center mb-6 font-semibold"
          variant="lead"
        >
         <span className="text-gray-600 text-xl">Contract Balance :</span>
         <span className="flex items-center gap-x-1">
          <FaEthereum className="text-[#3c3c3d]" />
          {contractBalance && contractBalance} Ether
            </span> 
        </Typography>
        {isAdminWithdrawing && (
          <>
            <div className="my-5 px-5 space-y-5 w-full">
              <Input
                color="green"
                variant="standard"
                name="address"
                onChange={(e) => {
                  setWithdrawAddress(e.target.value);
                }}
                label="Enter Account Address"
              />
            </div>
            <Button
              onClick={() => withdrawMoney()}
              className="flex items-center justify-center text-base gap-x-2 bg-primary"
              fullWidth
              disabled={!withdrawAddress.length}
            >
              Fund Now
              <AiOutlineArrowRight className="text-2xl" />
            </Button>
          </>
        )}
        {isAdminWithdrawing ? (
          <Button
            onClick={() => {
              setWithdrawAddress("");
              setIsAdminWithdrawing(false);
            }}
            className="bg-red-500 mt-12"
          >
            Cancel
          </Button>
        ) : (
          <Button
            onClick={() => setIsAdminWithdrawing(true)}
            className="flex items-center justify-center text-base gap-x-2 bg-primary"
            fullWidth
          >
            Withdraw Money
            <AiOutlineArrowRight className="text-2xl" />
          </Button>
        )}
      </div>
    </div>
  );
}
