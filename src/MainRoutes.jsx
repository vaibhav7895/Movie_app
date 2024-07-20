import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import Home from "./Components/Home";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/Auth" element={<Auth />} />
    </Routes>
  );
};

export default MainRoutes;
