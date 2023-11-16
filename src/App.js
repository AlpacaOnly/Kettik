import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import MainPage from "./pages/MainPage";
import EventCreationPage from "./pages/EventCreationPage";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create-event" element={<EventCreationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
