import React, { useRef, useState, useContext } from "react";
import MenuItems from "./MenuItems";
import { AuthContext } from "../../context/AuthContext";
import { useOnClickOutside } from "usehooks-ts";
import AvatarContainer from "../AvatarContainer";
import Search from "../Search";

interface MenuItem {
  label: string;
  link: string;
  onClick?: () => void;
}

interface MenuProps {
  menuItems: MenuItem[];
  handleClick?: () => void;
  handleClickOutside: () => void;
  handleLogout: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isActive?: boolean;
  avatarProps: AvatarTypes;
  isLoggedIn: boolean;
}

interface AvatarTypes {
  id: string;
  src: string;
  classAvatar: string;
  size: string;
  style?: any;
  onClick?: () => void;
}

const Menu: React.FC<MenuProps> = ({
  menuItems,
  handleClick,
  handleClickOutside,
  handleLogout,
  dropdownRef,
  isActive,
  avatarProps,
  isLoggedIn,
}) => {
  useOnClickOutside(dropdownRef, handleClickOutside);

  console.log(menuItems);

  return (
    <div className="menu-container" onClick={handleClick} ref={dropdownRef}>
      <button className="menu-trigger">MENU</button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
        onClick={handleClickOutside}
      >
        <Search
          searchClass="btn-search-bar"
          onClick={(e) => e.stopPropagation()}
        />
        <ul>
          <MenuItems menuItems={menuItems} handleLogout={handleLogout} />
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
