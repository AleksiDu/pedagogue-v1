import { FC, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import Search from "../../Search";
import MenuItems from "./MenuItem";

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
  isActive?: boolean;
}

const Menu: FC<MenuProps> = ({
  menuItems,
  handleClick,
  handleClickOutside,
  handleLogout,
  isActive = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div className="menu-container" onClick={handleClick} ref={dropdownRef}>
      <button className="menu-trigger">MENU</button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
        onClick={handleClickOutside}
      >
        <Search
          searchClassName="btn-search-bar"
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
