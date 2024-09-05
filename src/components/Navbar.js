import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Calendar, Clipboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="text-white text-xl font-bold">
        Healthcare
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/patients" className="text-white flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Patients</span>
          </Link>
        </li>
        <li>
          <Link to="/appointments" className="text-white flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Appointments</span>
          </Link>
        </li>
        <li>
          <Link to="/patient-portal" className="text-white flex items-center space-x-2">
            <Clipboard className="h-5 w-5" />
            <span>Patient Portal</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
