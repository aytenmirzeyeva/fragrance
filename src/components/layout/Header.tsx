import { NavLink } from "react-router-dom";
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
      className={`bg-pink-50 text-lg text-pink-900 md:fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out ${
        isScrolled ? "md:shadow-md" : "md:bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-bold text-xl hover:text-pink-400 transition-colors"
          >
            Fragrance
          </NavLink>

          {/* Right side icons for mobile */}
          <div className="flex items-center md:hidden gap-4">
            <NavLink
              to="/favoritesPage"
              className={({ isActive }) =>
                `px-4 py-2 transition-colors ${
                  isActive ? "text-pink-400" : "hover:text-pink-400"
                }`
              }
            >
              <FontAwesomeIcon
                icon={faHeartSolid as IconProp}
                className="text-xl"
              />
            </NavLink>

            {/* Hamburger Menu Button */}
            <button
              className="p-2 hover:text-pink-400 text-xl"
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
                  <NavLink
                    to={item === "Catalog" ? "/" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md transition-colors ${
                        isActive ? "text-pink-400" : "hover:text-pink-400"
                      }`
                    }
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Nav right side - desktop */}
            <ul className="flex items-center">
              <li>
                <NavLink
                  to="/favoritesPage"
                  className={({ isActive }) =>
                    `px-4 py-2 transition-colors ${
                      isActive ? "text-pink-400" : "hover:text-pink-400"
                    }`
                  }
                >
                  <FontAwesomeIcon
                    icon={faHeartSolid as IconProp}
                    className="text-xl"
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/loginPage"
                  className={({ isActive }) =>
                    `px-4 py-2 flex items-center transition-colors ${
                      isActive ? "text-pink-400" : "hover:text-pink-400"
                    }`
                  }
                >
                  <FontAwesomeIcon
                    icon={faCircleUser as IconProp}
                    className="text-xl mr-2"
                  />
                  <span>Login</span>
                </NavLink>
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
                  <NavLink
                    to={item === "Catalog" ? "/" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `w-full py-3 block transition-colors ${
                        isActive ? "text-pink-400" : "hover:text-pink-400"
                      }`
                    }
                    onClick={toggleNav}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/loginPage"
                  className={({ isActive }) =>
                    `w-full py-3 flex items-center transition-colors ${
                      isActive ? "text-pink-400" : "hover:text-pink-400"
                    }`
                  }
                  onClick={toggleNav}
                >
                  <FontAwesomeIcon
                    icon={faCircleUser as IconProp}
                    className="text-xl mr-2"
                  />
                  <span>Login</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
