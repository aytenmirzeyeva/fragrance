// import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const navItems = ["Catalog", "Notes", "Brands"];
  return (
    <header className="bg-pink-100 shadow-sm">
      <div className="container">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-fuchsia-900 text-xl hover:text-fuchsia-400 transition-colors"
          >
            Fragrance
          </Link>

          {/* Right side icons for mobile */}
          <div className="flex items-center md:hidden gap-4">
            <Link
              to="/favoritesPage"
              className="p-2 text-fuchsia-900 hover:text-fuchsia-400 flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faHeart as IconProp} className="text-xl" />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              className="p-2 text-fuchsia-900 hover:text-fuchsia-400 text-xl"
              onClick={toggleNav}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between flex-1 ml-8">
            {/* Nav left side */}
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Catalog" ? "/" : `/${item.toLowerCase()}`}
                    className="px-4 py-2 text-fuchsia-900 hover:text-fuchsia-400 rounded-md transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Nav right side - desktop */}
            <ul className="flex items-center">
              <li>
                <Link
                  to="/favoritesPage"
                  className="px-4 py-2 text-fuchsia-900 hover:text-fuchsia-400 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faHeart as IconProp}
                    className="text-xl"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/loginPage"
                  className="px-4 py-2 flex items-center text-fuchsia-900 hover:text-fuchsia-400 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faCircleUser as IconProp}
                    className="text-xl mr-2"
                  />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${
            isNavOpen ? "max-h-64" : "max-h-0"
          } md:hidden transition-all duration-500 ease-in-out overflow-hidden`}
        >
          <nav>
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Catalog" ? "/" : `/${item.toLowerCase()}`}
                    className="w-full py-3 block text-fuchsia-900 hover:text-fuchsia-400 transition-colors"
                    onClick={toggleNav}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/loginPage"
                  className="w-full py-3 flex items-center text-fuchsia-900 hover:text-fuchsia-400 hover:bg-pink-100 transition-colors"
                  onClick={toggleNav}
                >
                  <FontAwesomeIcon
                    icon={faCircleUser as IconProp}
                    className="text-xl mr-2"
                  />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
