import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
};

export default App;
