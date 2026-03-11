import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white shadow px-8 py-4 flex gap-6">
      <Link to="/" className="font-medium text-gray-700 hover:text-blue-600">
        Dashboard
      </Link>

      <Link
        to="/employees"
        className="font-medium text-gray-700 hover:text-blue-600"
      >
        Employees
      </Link>
    </div>
  );
};

export default Navbar;
