import React, { useRef, useState, FC, useEffect } from "react";
import Avatar from "react-avatar";
import { useOnClickOutside } from "usehooks-ts";
import logo from "../../assets/icons/logo.svg";
import Search from "../Search";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const Header: FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = () => {
    setIsActive(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAvatarBtn = () => {
    navigate("/registration");
  };

  return (
    <header className="app-header">
      <a href="/#" className="app-logo-name">
        <img src={logo} className="app-logo" alt="logo" />
        <span className="app-name">PEDAGOGUE</span>
      </a>

      <Search />
      <div className="left-header">
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
        <div className="avatar-container">
          <Avatar
            src="https://iheartcraftythings.com/wp-content/uploads/2021/03/Fox_3-758x1061.jpg"
            size="30"
            style={{
              borderColor: "black",
              borderRadius: 4,
              borderStyle: "solid",
            }}
            onClick={handleAvatarBtn}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
