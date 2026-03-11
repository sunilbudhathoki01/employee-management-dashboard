import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/api";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setEmployee(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!employee) {
    return <div className="p-6">Loading employee...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={employee.image}
            alt={employee.firstName}
            className="w-16 h-16 rounded-full"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="text-gray-500">{employee.email}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Gender:</span> {employee.gender}
          </p>
          <p>
            <span className="font-medium">Age:</span> {employee.age}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {employee.phone}
          </p>
          <p>
            <span className="font-medium">Company:</span>{" "}
            {employee.company?.name}
          </p>
          <p>
            <span className="font-medium">City:</span> {employee.address?.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
