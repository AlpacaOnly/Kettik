// EventCreationPage.js
import React from "react";
import CreateEventForm from "../components/CreateEventForm"; // Import your form component

const EventCreationPage = ({ tokenMasterContract }) => {
  return (
    <div>
      <h2>Create an Event</h2>
      <CreateEventForm tokenMasterContract={tokenMasterContract} />
    </div>
  );
};

export default EventCreationPage;
