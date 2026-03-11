import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const totalEmployees = employees.length;
  const maleEmployees = employees.filter((emp) => emp.gender === "male").length;
  const femaleEmployees = employees.filter(
    (emp) => emp.gender === "female",
  ).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-gray-500 text-sm">Total Employees</h2>
          <p className="text-3xl font-semibold mt-2">{totalEmployees}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-gray-500 text-sm">Male Employees</h2>
          <p className="text-3xl font-semibold mt-2">{maleEmployees}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-gray-500 text-sm">Female Employees</h2>
          <p className="text-3xl font-semibold mt-2">{femaleEmployees}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
