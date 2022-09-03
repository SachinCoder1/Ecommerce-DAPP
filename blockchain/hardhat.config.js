require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

const PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY
const RPC_URL = process.env.POLYGON_RPC_URL

module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {},
    polygon: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};