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

const MenuItems: FC<MenuItemsProps> = ({ menuItems, handleLogout }) => {
  const screenWidth = useScreenWidth();
  const isLoggedIn = useAuth();

  if (screenWidth >= 480) {
    return null; // Return null to not render the avatar container
  } else {
    if (isLoggedIn) {
      menuItems.push({ label: "Logout", link: "/#", onClick: handleLogout });
    } else {
      menuItems.push({ label: "Login", link: "/Login" });
    }
  }

  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.label}>
          <Link to={menuItem.link}>{menuItem.label}</Link>
        </li>
      ))}
    </>
  );
};

export default MenuItems;
