const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners();
  const NAME = "TokenMaster";
  const SYMBOL = "TM";

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster");
  // const TokenMaster = await sdk.getContract(
  //   "0xFa3764e3BE77576e62b94854f1D57b0E4Ad84EA9" // The address of your smart contract
  // );
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);
  await tokenMaster.deployed();

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`);

  // List events
  const occasions = [
    {
      name: "Barys - Sochi",
      cost: tokens(3),
      tickets: 0,
      date: "October 31",
      time: "6:00PM EST",
      location: "Barys Arena - Astana, KZ",
    },
    {
      name: "Oppenheimer",
      cost: tokens(1),
      tickets: 125,
      date: "July 21",
      time: "1:00PM IST",
      location: "MegaSilkway - Astana",
    },
    {
      name: "Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "November 9",
      time: "10:00AM TRT",
      location: "Nazarbayev University",
    },
    {
      name: "Chelsea vs Liverpool",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM GMT",
      location: "Stamford Bridge - London , England",
    },
  ];

  for (var i = 0; i < 4; i++) {
    const transaction = await tokenMaster
      .connect(deployer)
      .list(
        occasions[i].name,
        occasions[i].cost,
        occasions[i].tickets,
        occasions[i].date,
        occasions[i].time,
        occasions[i].location
      );

    await transaction.wait();

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
