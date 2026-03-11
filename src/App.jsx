import React from "react";
import { Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
};

export default App;
