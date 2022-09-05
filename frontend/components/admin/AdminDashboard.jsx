import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";

export default function AdminDashboard() {
  const [isAdminWithdrawing, setIsAdminWithdrawing] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const withdrawMoney = () => {};
  const [contractBalance, setContractBalance] = useState("2.2")
  return (
    <div className="space-y-10">
      <Typography variant="h3">Admin Dashobard</Typography>
      <div className="bg-white h-50 w-5/6 mx-auto p-10">
        <Typography className="flex gap-x-2 items-center mb-6 font-semibold" variant="lead">
          <span className="text-gray-600 text-xl">Contract Balance :</span>
          <FaEthereum className="text-[#3c3c3d]" />
          {contractBalance} Ether
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
