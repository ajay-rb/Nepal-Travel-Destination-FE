import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-md mb-4">
      <h1 className="text-2xl md:text-3xl font-bold cursor-pointer" onClick={()=>navigate('/')}>Nepali Travel Destinations</h1>

      <div className="hidden md:flex gap-4">
        {user && (
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
          >
            + Add Post
          </button>
        )}

        {user ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600"
          >
            Login
          </button>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          <svg
            className="w-8 h-8 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 w-48 z-50 md:hidden">
          {user && (
            <button
              onClick={() => {
                navigate("/admin");
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 bg-blue-500 text-white font-semibold rounded mb-2 hover:bg-blue-600"
            >
              + Add Post
            </button>
          )}

          {user ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
