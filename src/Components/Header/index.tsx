import { useRef, useState, FC, useEffect } from "react";
import Avatar from "react-avatar";
import { useOnClickOutside } from "usehooks-ts";
import logo from "../../assets/icons/logo.svg";
import Search from "../Search";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import axios from "axios";

const Header: FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState<string>(
    "https://iheartcraftythings.com/wp-content/uploads/2021/03/Fox_3-758x1061.jpg"
  );

  const navigate = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = () => {
    setIsActive(false);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("Access token not found.");
        return;
      }
      const response = await axios.get(
        `/api/Photo/${localStorage.getItem("accessToken")}`
      );
      setImageURL(response.data.url);
    } catch (error) {
      console.log("Error fetching image:", error);
    }
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAvatarBtn = () => {
    navigate("/login");
  };

  return (
    <header className="app-header">
      <Link to={"/#"} className="app-logo-name">
        <img src={logo} className="app-logo" alt="logo" />
        <span className="app-name">PEDAGOGUE</span>
      </Link>
      <div className="header-search-bar">
        <Search />
      </div>
      <div className="left-header">
        <div className="menu-container" onClick={handleClick} ref={dropdownRef}>
          <button className="menu-trigger">MENU</button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <div
              className="btn-search-bar"
              onClick={(e) => e.stopPropagation()} //  <--- Prevent any propagation of the same event
            >
              <Search />
            </div>

            <ul>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={"/#"}>Settings</Link>
              </li>
              <li>
                <Link to={"/#"}>Curriculum</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="avatar-container">
          <Avatar
            src={imageURL}
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
