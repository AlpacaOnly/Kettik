// MainPage.js
import React from "react";
import Sort from "../components/Sort";
import Card from "../components/Card";
import SeatChart from "../components/SeatChart";
import CreateEventForm from "../components/CreateEventForm";
import Navigation from "../components/Navigation";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

// ABIs
import TokenMaster from "../abis/TokenMaster.json";

// Config
import config from "../config.json";

const MainPage = ({}) => {
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
    <>
      <header>
        <h2 className="header__title">
          <strong>Kettik</strong>
        </h2>
      </header>
      <Navigation account={account} setAccount={setAccount} />
      <Sort />

      <div className="cards">
        {occasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            tokenMaster={tokenMaster}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>
      {toggle && (
        <SeatChart
          occasion={occasion}
          tokenMaster={tokenMaster}
          provider={provider}
          setToggle={setToggle}
        />
      )}
    </>
  );
};

export default MainPage;
