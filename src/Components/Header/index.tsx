import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import logo from "../../assets/icons/logo.svg";
import Search from "../Search";

import "./styles.css";

const Header: React.FC = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = () => {
    setIsActive(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <header className="app-header">
      <a href="/#">
        <img src={logo} className="app-logo" alt="logo" />
      </a>
      <a href="/#" className="app-name">
        PEDAGOGUE
      </a>
      <Search />
      <div className="menu-button ">
        <div className="menu-container" onClick={handleClick} ref={dropdownRef}>
          <button className="menu-trigger">MENU</button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <a href="/#">Profile</a>
              </li>
              <li>
                <a href="/#">Settings</a>
              </li>
              <li>
                <a href="/#">Curriculum</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
