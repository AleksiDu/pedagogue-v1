import { FC } from "react";
import { Link } from "react-router-dom";
import { useScreenWidth } from "../../context/ScreenWidthContext";
import { useAuth } from "../../context/AuthContext";

interface MenuItem {
  label: string;
  link: string;
  onClick?: () => void;
}

interface MenuItemsProps {
  menuItems: MenuItem[];
  handleLogout: () => void;
}

const renderLoginLogout = (
  screenWidth: number,
  isLoggedIn: boolean,
  handleLogout: () => void
) => {
  if (screenWidth < 480) {
    return (
      <li>
        <Link to={isLoggedIn ? "/#" : "/Login"} onClick={handleLogout}>
          {isLoggedIn ? "Logout" : "Login"}
        </Link>
      </li>
    );
  }
  return null;
};

const MenuItems: FC<MenuItemsProps> = ({ menuItems, handleLogout }) => {
  const screenWidth = useScreenWidth();
  const { isLoggedIn } = useAuth();

  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.label}>
          <Link to={menuItem.link}>{menuItem.label}</Link>
        </li>
      ))}
      {renderLoginLogout(screenWidth, isLoggedIn, handleLogout)}
    </>
  );
};

export default MenuItems;
