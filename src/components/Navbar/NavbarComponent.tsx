import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/luton-hotel-high-resolution-logo-transparent.png";

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg w-full relative">
      <div className="w-full py-4 px-6 flex items-center justify-between md:justify-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-28" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none"
          >
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bg-white z-50 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`} // Ensure mobile menu is only visible on small screens
        style={{ width: "100vw" }} // Set full width for mobile menu
      >
        <div className="flex flex-col items-center space-y-4 py-4 mt-20 relative">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-500 focus:outline-none"
          >
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Link
            to="/"
            className="text-xl text-customDarkOrange hover:text-customOrange"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Hotel
          </Link>
          <Link
            to="/"
            className="text-xl text-customDarkOrange hover:text-customOrange"
            onClick={() => setIsMenuOpen(false)}
          >
            Rooms & Rates
          </Link>
          <Link
            to="/"
            className="text-xl text-customDarkOrange hover:text-customOrange"
            onClick={() => setIsMenuOpen(false)}
          >
            Facilities
          </Link>
          <Link
            to="/"
            className="text-xl text-customDarkOrange hover:text-customOrange"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="py-2 px-4 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="py-2 px-4 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Primary Navbar items */}
      <div className="hidden md:flex md:justify-center md:space-x-8">
        <Link
          to="/"
          className="text-xl text-customDarkOrange hover:text-customOrange"
        >
          Our Hotel
        </Link>
        <Link
          to="/"
          className="text-xl text-customDarkOrange hover:text-customOrange"
        >
          Rooms & Rates
        </Link>
        <Link
          to="/"
          className="text-xl text-customDarkOrange hover:text-customOrange"
        >
          Facilities
        </Link>
        <Link
          to="/"
          className="text-xl text-customDarkOrange hover:text-customOrange"
        >
          Contact Us
        </Link>
      </div>

      {/* Secondary Navbar items */}
      <div className="hidden md:flex md:absolute md:right-0 md:space-x-2 md:pr-6">
        <Link
          to="/login"
          className="py-2 px-4 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="py-2 px-4 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
