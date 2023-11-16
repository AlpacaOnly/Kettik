import React, { useState } from "react";
import { ethers } from "ethers";

const CreateEventForm = ({ tokenMaster, provider }) => {
  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    tickets: "",
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(parseInt(formData.tickets, 10))
      const signer = provider.getSigner();
      console.log(signer)
      const costInWei = ethers.utils.parseUnits(formData.cost, "ether");
      const transaction = await tokenMaster.connect(signer).list(
        formData.name,
        costInWei,
        parseInt(formData.tickets, 10),
        formData.date,
        formData.time,
        formData.location
      );
      await transaction.wait();
      alert(`Event created: ${formData.name}`);
      // Optionally reset the form fields here
    } catch (error) {
      console.error(error);
      alert("Failed to create the event.");
    }
  };

  return (
    <form className="w-50 p-5 m-5" onSubmit={handleSubmit}>
      <h4>Create an Event</h4>
      <div className="form-group">
        <label>Event Name:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Event Cost (in ETH):</label>
        <input
          type="text"
          className="form-control"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Maximum Tickets:</label>
        <input
          type="number"
          className="form-control"
          name="tickets"
          value={formData.tickets}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Event Date:</label>
        <input
          type="text"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Event Time:</label>
        <input
          type="text"
          className="form-control"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Event Location:</label>
        <input
          type="text"
          className="form-control"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;
