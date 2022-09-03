import { createContext, useState } from "react";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState("");

  return (
    <MainContext.Provider
      value={{
        accountAddress,
        setAccountAddress,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
