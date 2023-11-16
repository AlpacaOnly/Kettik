// EventCreationPage.js
import React from "react";
import CreateEventForm from "../components/CreateEventForm"; // Import your form component
import Sort from "../components/Sort";
import Navigation from "../components/Navigation";

const EventCreationPage = ({ tokenMaster, account, setAccount, provider }) => {
  return (
    <>
    <header>
      <Navigation account={account} setAccount={setAccount} />
      <h2 className="header__title">
        <strong>Kettik</strong>
      </h2>
    </header>
    <Sort />

    <div>
      <h2>Create an Event</h2>
      <CreateEventForm tokenMaster={tokenMaster} provider={provider} />
    </div>
    </>
  );
};

export default EventCreationPage;
