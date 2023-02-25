import React, { useRef } from "react";
import logo from "../../assets/icons/logo.svg";
import useDetectOutsideClick from "./hooks/useDetectOutsideClick";
import "./styles.css";

const Header: React.FC = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  console.log("before click", isActive);

  const handleClick = () => {
    setIsActive(!isActive);
    console.log("after click", isActive);
  };

  return (
    <header className="app-header">
      <a href="/#">
        <img src={logo} className="app-logo" alt="logo" />
      </a>
      <a href="/#" className="app-name">
        PEDAGOGUE
      </a>

      <div className="menu-button">
        <div className="menu-container">
          <button onClick={handleClick} className="menu-trigger">
            MENU
          </button>
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
