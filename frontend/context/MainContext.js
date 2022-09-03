import { createContext, useState } from "react";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState("");

  const isAdmin = () => {
    if(!accountAddress) return false;
    if(process.env.NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS === accountAddress){
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
