import { ethers } from "ethers";
import { createContext, useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_OWNER_ADDRESS } from "../constants";
import ContractABI from "../constants/Ecommerce.json";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState("");
  const [currentBlock, setCurrentBlock] = useState(0)

  const isAdmin = () => {
    if(!accountAddress) return false;
    if(CONTRACT_OWNER_ADDRESS === accountAddress){
        return true;
    }else{
        return false;
    }
  }

  const requestContract = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ContractABI.abi,
          signer
        );
        const blockNumber = await provider.getBlockNumber();
        setCurrentBlock(blockNumber)

        return contract;
  }

  return (
    <MainContext.Provider
      value={{
        accountAddress,
        currentBlock,
        setAccountAddress,
        isAdmin,
        requestContract
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
