import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const departments = [
    "All",
    ...new Set(employees.map((emp) => emp.company.department)),
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.users);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || emp.company.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        Employees
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search employee..."
          className="border rounded-md px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-md px-3 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50 transition">
                {/* Employee */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={emp.image}
                    alt={emp.firstName}
                    className="w-9 h-9 rounded-full object-cover border"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      {emp.firstName} {emp.lastName}
                    </p>
                    <p className="text-xs text-gray-500 sm:hidden">
                      {emp.email}
                    </p>
                  </div>
                </td>

                {/* Department */}
                <td className="px-4 py-3 text-gray-600">
                  {emp.company.department}
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                  {emp.email}
                </td>

                {/* Gender */}
                <td className="px-4 py-3 capitalize text-gray-600">
                  {emp.gender}
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  <Link
                    to={`/employees/${emp.id}`}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
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
