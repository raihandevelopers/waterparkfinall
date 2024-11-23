import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage dropdown visibility

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex w-64 bg-indigo-700 text-white flex-col">
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-indigo-300 mt-2">Manage your dashboard</p>
        </div>
        <nav className="flex flex-col gap-2 px-4">
          <NavLink
            to="/admin/add-waterpark"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Add Waterpark
          </NavLink>
          <NavLink
            to="/admin/edit-waterpark"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Edit Waterpark
          </NavLink>
          <NavLink
            to="/admin/get-bookings"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Bookings
          </NavLink>
          <NavLink
            to="/admin/privacypolicy"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/admin/termsconditions"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Terms & Conditions
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto mx-4 mb-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Mobile Navigation */}
      <header className="md:hidden bg-indigo-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </header>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <nav className="md:hidden bg-indigo-700 text-white flex flex-col gap-2 p-4">
          <NavLink
            to="/admin/add-waterpark"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu after click
          >
            Add Waterpark
          </NavLink>
          <NavLink
            to="/admin/edit-waterpark"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Edit Waterpark
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Bookings
          </NavLink>
          <NavLink
            to="/admin/privacypolicy"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/admin/termsconditions"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Terms & Conditions
          </NavLink>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          Welcome to Admin Dashboard
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
