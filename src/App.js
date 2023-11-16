import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";

import TokenMaster from "./abis/TokenMaster.json";
import config from "./config.json";
import MainPage from "./pages/MainPage";
import EventCreationPage from "./pages/EventCreationPage";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    // console.log("network.chainId:", network.chainId);
    const network = await provider.getNetwork();

    console.log("config:", config);
    console.log("network:", network);
    const tokenMaster = new ethers.Contract(
      config[network.chainId].TokenMaster.address,
      TokenMaster,
      provider
    );
    setTokenMaster(tokenMaster);

    const totalOccasions = await tokenMaster.totalOccasions();
    const occasions = [];

    // console.log(await tokenMaster.getUserOccasions());

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await tokenMaster.getOccasion(i);
      occasions.push(occasion);
    }

    setOccasions(occasions);
    console.log(occasions);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage account={account} occasions={occasions} tokenMaster={tokenMaster} provider={provider} setAccount={setAccount} toggle={toggle} setToggle={setToggle} occasion={occasion} setOccasion={setOccasion} />} />
          <Route path="/create-event" element={<EventCreationPage tokenMaster={tokenMaster} account={account} setAccount={setAccount} provider={provider} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
