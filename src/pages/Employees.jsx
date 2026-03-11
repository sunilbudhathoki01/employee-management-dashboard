import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-4">Employees</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search employee..."
          className="border rounded-md p-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ONLY CHANGE: wrapper for mobile scroll */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={emp.image}
                    alt={emp.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">
                    {emp.firstName} {emp.lastName}
                  </span>
                </td>

                <td className="text-gray-600">{emp.email}</td>

                <td className="capitalize">{emp.gender}</td>

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
    </div>
  );
};

export default Employees;
