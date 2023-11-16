// MainPage.js
import React from "react";
import Sort from "../components/Sort";
import Card from "../components/Card";
import SeatChart from "../components/SeatChart";

import Navigation from "../components/Navigation";


const MainPage = ({account, occasions, tokenMaster, provider, setAccount, toggle, setToggle, occasion, setOccasion}) => {
  return (
    <>
      <header>
        <Navigation account={account} setAccount={setAccount} />
        <h2 className="header__title">
          <strong>Kettik</strong>
        </h2>
      </header>
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
