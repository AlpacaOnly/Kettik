import React from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>kettik</h1>

        <input
          className="nav__search"
          type="text"
          placeholder="Find millions of experiences"
        />

        <ul className="nav__links">
          <li>
            <Link to="/">Concerts</Link>
          </li>
          {account == "0x47e4f95FB4623A5831ea20aeB4C11E7873b08bE2" ? 
          <li>
            <Link to="/create-event">Create Event</Link>
          </li> : <li></li>
          }

          {account ? 
          <li>
            <Link to="/my-events">My Events</Link>
          </li> : <li></li>
          }
        </ul>
      </div>

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
