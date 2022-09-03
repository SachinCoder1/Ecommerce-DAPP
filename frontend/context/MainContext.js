import { createContext, useState } from "react";
import { CONTRACT_OWNER_ADDRESS } from "../constants";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState("");

  const isAdmin = () => {
    if(!accountAddress) return false;
    if(CONTRACT_OWNER_ADDRESS === accountAddress){
        return true;
    }else{
        return false;
    }
  }

  return (
    <MainContext.Provider
      value={{
        accountAddress,
        setAccountAddress,
        isAdmin
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
