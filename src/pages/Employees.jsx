import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { Link } from "react-router-dom";

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
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Gender</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                {emp.firstName} {emp.lastName}
              </td>
              <td className="text-gray-600">{emp.email}</td>
              <td>{emp.gender}</td>
              <td>
                <Link
                  to={`/employees/${emp.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
