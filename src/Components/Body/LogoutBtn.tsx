import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useScreenWidth } from "../../context/ScreenWidthContext";

const LogoutButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const screenWidth = useScreenWidth();

  const handleLogoutClick = () => {
    const keyArr = ["accessToken", "email", "role", "password"];
    keyArr.forEach((key) => localStorage.removeItem(key));
    setIsLoggedIn(false);
  };

  if (screenWidth < 480 || !isLoggedIn) {
    return null;
  }

  return (
    <button
      className="logout-button"
      onClick={handleLogoutClick}
      aria-label="Logout"
    >
      <span className="book"></span>
      <span className="logout-text">Logout</span>
    </button>
  );
};

export default LogoutButton;
