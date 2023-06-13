import { useRef, useState, FC, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";

import Search from "../Search";
import fetchProfileImage from "../../utils/fetchProfileImage ";
import logo from "../../assets/icons/logo.svg";
import Logo from "./Components/Logo";
import Menu from "./Components/Menu";
import AvatarContainer from "../AvatarContainer";

import { AuthContext } from "../../context/AuthContext";

import "./header.css";

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
      fetchImage().catch(console.error);
    }
  }, [isLoggedIn]);

  useOnClickOutside(dropdownRef, handleClickOutside);

  const handleAvatarBtn = () => {
    navigate("/profile/#confirm");

    console.log("{previousStep: 2 activeStep: 3}");
  };

  const handleLogout = () => {
    const keyArr = ["accessToken", "email", "role", "password"];
    keyArr.forEach((key) => localStorage.removeItem(key));
    setIsLoggedIn(false);
  };

  const avatarProps = {
    className: "avatar-container",
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

  return (
    <header className="app-header">
      <Logo
        logo={logo}
        appName="PEDAGOGUE"
        to={"/#"}
        linkClassName="app-logo-name"
        logoClassName="app-logo"
        nameClassName="app-name"
        alt="logo"
      />
      <Search searchClassName="header-search-bar" />
      <div className="left-header">
        <Menu
          handleClick={handleClick}
          handleClickOutside={handleClickOutside}
          handleLogout={handleLogout}
          isActive={isActive}
          menuItems={menuItems}
        />
        <AvatarContainer isLoggedIn={isLoggedIn} {...avatarProps} />
      </div>
    </header>
  );
};

export default Header;
