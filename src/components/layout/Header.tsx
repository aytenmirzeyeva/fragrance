// import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItems = ["Catalog", "Notes", "Brands"];

  return (
    <header
      className={`bg-pink-50 text-pink-900 md:fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out ${
        isScrolled ? "md:shadow-md" : "md:bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl hover:text-pink-300 transition-colors"
          >
            Fragrance
          </Link>

          {/* Right side icons for mobile */}
          <div className="flex items-center md:hidden gap-4">
            <Link
              to="/favoritesPage"
              className="p-2 hover:text-pink-300 flex justify-center items-center"
            >
              <FontAwesomeIcon
                icon={faHeartSolid as IconProp}
                className="text-xl"
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              className="p-2 hover:text-pink-300 text-xl"
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
                    className="px-4 py-2 hover:text-pink-300 rounded-md transition-colors"
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
                  className="px-4 py-2 hover:text-pink-300 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faHeartSolid as IconProp}
                    className="text-xl"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/loginPage"
                  className="px-4 py-2 flex items-center hover:text-pink-300 transition-colors"
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
            <ul className="flex flex-col py-2">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Catalog" ? "/" : `/${item.toLowerCase()}`}
                    className="w-full py-3 block hover:text-pink-300 transition-colors"
                    onClick={toggleNav}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/loginPage"
                  className="w-full py-3 flex items-center hover:text-pink-300 transition-colors"
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
