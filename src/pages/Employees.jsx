import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employees</h1>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr>
              <td className="p-2">
                {emp.firstname} {emp.lastName}
              </td>
              <td>{emp.email}</td>
              <td>{emp.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
