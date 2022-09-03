import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import { MainContext } from "../../context/MainContext";


const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

export default function WalletConnect() {
  const {accountAddress, setAccountAddress} = useContext(MainContext)
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window) {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            console.log(accounts);
            setAccountAddress(accounts[0]);
            connectWallet();
            console.log("Account Changed");
          } else {
            setAccountAddress("");
            console.log(accounts);
            setBalance("");
            localStorage.removeItem("injected");
            console.log("Disconnected");
          }
        });
      }
    }

    if (localStorage.getItem("injected")) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      if (provider.network !== "matic") {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["polygon"],
            },
          ],
        });
      }
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAccountAddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
      localStorage.setItem("injected", "web3");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error while connected wallet ", error);
    }
  };

  return (
    <div>
      {accountAddress.length > 2 ? (
        <div className="bg-slate-200 py-2.5 rounded-2xl pl-4 cursor-pointer">
          <span className="text-black">
            {accountAddress.slice(0, 6)}...{accountAddress.slice(accountAddress.length - 4)}
          </span>
          <span className="bg-primary py-2.5 ml-4 px-3 rounded-2xl text-white">
            {balance.slice(0, 4)} ETH
          </span>
        </div>
      ) : (
        <Button disabled={loading} className="flex items-center justify-center gap-x-2 bg-primary" onClick={connectWallet}>
           <AiOutlinePlus className="text-xl text-white" />
           Connect Wallet
        </Button>
      )}
    </div>
  );
}
