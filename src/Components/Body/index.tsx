import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import Profile from "../../pages/Profile";
import Home from "../../pages/home";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import SettingsPage from "../../pages/SettingsPage";

import "./styles.css";
import Curriculum from "../../pages/Curriculum";
import ForgetPassword from "../RegistrationLoginCom/ForgetPassword";
import PasswordReset from "../RegistrationLoginCom/PasswordReset";
import { AuthContext } from "../../context/AuthContext";
import { useScreenWidth } from "../../context/ScreenWidthContext";
import PrivateRoutes from "../../utils/PrivateRoutes";
import FourOhFour from "../FourOhFour";
import ProfileImageGallery from "../ProfileForm/Components/ProfileImageGallery";
import { ThemeContext } from "../../context/ThemeContext";

const Body: React.FC = () => {
  const REGISTER_URL = "/registration";
  const location = useLocation();
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const screenWidth = useScreenWidth();

  // TODO update from localStorage!!!
  const userName = localStorage.getItem("username") || "";
  const accessToken = localStorage.getItem("accessToken") || "";

  const handleLogout = () => {
    const keyArr = ["accessToken", "email", "role", "password"];
    keyArr.forEach((key) => localStorage.removeItem(key));
    setIsLoggedIn(false);
  };
  useEffect(() => {
    switch (location.pathname) {
      case REGISTER_URL + "/Tutor":
      case REGISTER_URL + "/Student":
      case REGISTER_URL + "/Parent":
        break;
      default:
        localStorage.removeItem("activeBtn");
        break;
    }
  }, [location]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode === "true");
    }
  }, [setIsDarkMode]);

  const renderLogoutBtn = () => {
    if (screenWidth < 480) {
      return null;
    }
    if (isLoggedIn) {
      return (
        <button className="logout-button" onClick={handleLogout}>
          <span className="book"></span>
          <span className="logout-text">Logout</span>
        </button>
      );
    } else {
      return;
    }
  };

  console.log("is Dark mode?", isDarkMode);

  return (
    <>
      <section className={`landing-page  ${isDarkMode ? "dark-mode" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration/*" element={<Registration />}></Route>
          <Route path="/login/*" element={<Login />}></Route>
          <Route path="/forgetpassword/*" element={<ForgetPassword />}></Route>
          <Route path="/resetpassword" element={<PasswordReset />}></Route>
          <Route path="/profile/*" element={<PrivateRoutes />}>
            <Route path="/profile/*" element={<Profile />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/settings/*"
              element={
                <SettingsPage userName={userName} accessToken={accessToken} />
              }
            />
          </Route>
          <Route path="/Curriculum/*" element={<Curriculum />}></Route>

          <Route
            path="/gallery/*"
            element={<ProfileImageGallery images={[]} />}
          ></Route>

          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </section>
      {renderLogoutBtn()}
    </>
  );
};

export default Body;
