import { useRef, useState, FC, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import Avatar from "react-avatar";
import Search from "../Search";

import fetchProfileImage from "../../utils/fetchProfileImage ";
import logo from "../../assets/icons/logo.svg";
import "./styles.css";

import { AuthContext } from "../../context/AuthContext";
import { useScreenWidth } from "../../context/ScreenWidthContext";
import Logo from "./Logo";
import Menu from "../Menu";
import MenuItems from "../Menu/MenuItems";
import AvatarContainer from "../AvatarContainer";

interface MenuItem {
  label: string;
  link: string;
  onClick?: () => void;
}

const Header: FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [imageKey, setImageKey] = useState<string>("Fox1061");
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState<string>(
    "https://iheartcraftythings.com/wp-content/uploads/2021/03/Fox_3-758x1061.jpg"
  );

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const screenWidth = useScreenWidth();

  const menuItems: MenuItem[] = [
    { label: "Profile", link: "/profile/#confirm" },
    { label: "Settings", link: "/settings" },
    { label: "Curriculum", link: "/curriculum" },
  ];

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
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.log("Access token not found.");
          return;
        }

        const result = await fetchProfileImage(Number(role), accessToken);

        if (result) {
          const { imageURL, imageKey } = result;
          setImageURL(imageURL);
          setImageKey(imageKey);
        } else {
          // Handle the case when fetchProfileImage returns undefined
          console.log("Image not found.");
        }
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

  const avatarProps = {
    classAvatar: "avatar-container",
    id: imageKey,
    src: imageURL,
    size: "30",
    style: {
      borderColor: "black",
      borderRadius: 4,
      borderStyle: "solid",
    },
    onClick: handleAvatarBtn,
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
    }

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
      <Logo
        logo={logo}
        appName="PEDAGOGUE"
        to={"/#"}
        linkClass="app-logo-name"
        logoClass="app-logo"
        nameClass="app-name"
        alt="logo"
      />
      <Search searchClass="header-search-bar" />
      <div className="left-header">
        <Menu
          handleClick={handleClick}
          handleClickOutside={handleClickOutside}
          handleLogout={handleLogout}
          dropdownRef={dropdownRef}
          isActive={isActive}
          menuItems={menuItems}
          avatarProps={avatarProps}
          isLoggedIn={isLoggedIn}
        />
        <AvatarContainer
          onClick={avatarProps.onClick}
          isLoggedIn={isLoggedIn}
          classAvatar={avatarProps.classAvatar}
          size={avatarProps.size}
          style={avatarProps.style}
          id={avatarProps.id}
          src={avatarProps.src}
        />
        {/* <div className="menu-container" onClick={handleClick} ref={dropdownRef}>
          <button className="menu-trigger">MENU</button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <SearchBar
              searchClass="btn-search-bar"
              onClick={(e) => e.stopPropagation()} //  <--- Prevent any propagation of the same event
            />
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
        </div> */}
        {/* {renderAvatarContainer()} */}
      </div>
    </header>
  );
};

export default Header;
