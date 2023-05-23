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

const Body: React.FC = () => {
  const REGISTER_URL = "/registration";
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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
  return (
    <>
      <section className="landing-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration/*" element={<Registration />}></Route>
          <Route path="/login/*" element={<Login />}></Route>
          <Route path="/forget_password/*" element={<ForgetPassword />}></Route>
          <Route
            path="/reset_password/:resetCode"
            element={<PasswordReset />}
          ></Route>
          <Route path="/profile/*" element={<Profile />}></Route>
          <Route
            path="/settings/*"
            element={
              <SettingsPage userName={userName} accessToken={accessToken} />
            }
          ></Route>
          <Route path="/Curriculum/*" element={<Curriculum />}></Route>
        </Routes>
      </section>
      {isLoggedIn ? (
        <button className="logout-button" onClick={handleLogout}>
          <span className="book"></span>
          <span className="logout-text">Logout</span>
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default Body;
