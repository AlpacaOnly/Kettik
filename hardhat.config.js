require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepholia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      chainId: 31337,
      accounts: [
        {
          privateKey:
            "fa3000512c1d595e0eeb59976289d79bf5f2d6fda39ab2e5ccdac9805eda7c3f",
          balance: "999999999999999999999991000000000000",
        },
      ],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
