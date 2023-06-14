import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Curriculum from "../../pages/Curriculum";
import FourOhFour from "../FourOhFour";
import ForgetPassword from "../RegistrationLoginCom/ForgetPassword";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import PasswordReset from "../RegistrationLoginCom/PasswordReset";
import PrivateRoutes from "../../utils/PrivateRoutes";
import Profile from "../../pages/Profile";
import ProfileImageGallery from "../ProfileForm/Components/ProfileImageGallery";
import Registration from "../../pages/Registration";
import SettingsPage from "../../pages/SettingsPage";

import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useScreenWidth } from "../../context/ScreenWidthContext";

import "./styles.css";

const Body = () => {
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
