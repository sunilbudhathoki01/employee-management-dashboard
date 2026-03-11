import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { Users, User, UserCheck } from "lucide-react";

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

  const cards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: <Users size={28} />,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Male Employees",
      value: maleEmployees,
      icon: <User size={28} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Female Employees",
      value: femaleEmployees,
      icon: <UserCheck size={28} />,
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <p className="opacity-90 mt-1">
          Overview of your organization employees
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              <h2 className="text-gray-500 text-sm">{card.title}</h2>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>

            <div
              className={`p-4 rounded-lg bg-gradient-to-r ${card.color} text-white`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Optional Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Dashboard Summary</h2>
        <p className="text-gray-600">
          This dashboard gives you an overview of employee distribution within
          the organization. You can manage employees, monitor statistics, and
          track growth.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
