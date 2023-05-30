import { useRef, useState, FC, useEffect, useContext } from "react";
import Avatar from "react-avatar";
import { useOnClickOutside } from "usehooks-ts";
import logo from "../../assets/icons/logo.svg";
import Search from "../Search";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useScreenWidth } from "../../context/ScreenWidthContext";

const Header: FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [imageKey, setImageKey] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState<string>(
    "https://iheartcraftythings.com/wp-content/uploads/2021/03/Fox_3-758x1061.jpg"
  );

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const screenWidth = useScreenWidth();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const role = localStorage.getItem("role");

        // Set the userRole state based on the role value
        let updatedUserRole = "";
        switch (Number(role)) {
          case 1:
            updatedUserRole = "Tutor";
            break;
          case 2:
            updatedUserRole = "Student";
            break;
          case 3:
            updatedUserRole = "Parent";
            break;
          default:
            updatedUserRole = "default";
            break;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Access token not found.");
          return;
        }
        const response = await axios.get<{
          images: string;
        }>(`/api/${updatedUserRole}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { images } = response.data;
        const timestamp = new Date().getTime();
        setImageURL(`${images}?t=${timestamp}`);
        setImageKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    };

    if (isLoggedIn) {
      fetchImage();
    }
  }, [isLoggedIn]);

  useOnClickOutside(dropdownRef, handleClickOutside);

  const handleAvatarBtn = () => {
    navigate("/profile/#confirm");

    console.log("{previousStep: 2 activeStep: 3}");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    const keyArr = ["accessToken", "email", "role", "password"];
    keyArr.forEach((key) => localStorage.removeItem(key));
    setIsLoggedIn(false);
  };

  const renderAvatarContainer = () => {
    if (screenWidth < 480) {
      return null; // Return null to not render the avatar container
    }

    if (isLoggedIn) {
      return (
        <div className="avatar-container">
          <Avatar
            key={imageKey}
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
      );
    } else {
      return (
        <div className="avatar-container">
          <Avatar
            src={require("../../assets/icons/login_logo.png")}
            size="30"
            style={{
              borderColor: "black",
              borderRadius: 4,
              borderStyle: "solid",
            }}
            onClick={handleLogin}
          />
        </div>
      );
    }
  };

  const renderMenuContainer = () => {
    if (screenWidth >= 480) {
      return null; // Return null to not render the avatar container
    }
    if (isLoggedIn) {
      return (
        <li>
          <Link to={"/#"} onClick={handleLogout}>
            Logout
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to={"/Login"}>Login</Link>
        </li>
      );
    }
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
                <Link to={"/profile/#confirm"}>Profile</Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
              <li>
                <Link to={"/curriculum"}>Curriculum</Link>
              </li>
              {renderMenuContainer()}
            </ul>
          </nav>
        </div>
        {renderAvatarContainer()}
      </div>
    </header>
  );
};

export default Header;
