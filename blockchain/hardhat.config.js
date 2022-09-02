require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY
const RPC_URL = process.env.POLYGON_RPC_URL

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    polygon: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
