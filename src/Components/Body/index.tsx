import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Curriculum from "../../pages/Curriculum";
import ForgetPassword from "../RegistrationLoginCom/ForgetPassword";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import PasswordReset from "../RegistrationLoginCom/PasswordReset";
import PrivateRoutes from "../../utils/PrivateRoutes";
import Profile from "../../pages/Profile";
import Registration from "../../pages/Registration";
import SettingsPage from "../../pages/SettingsPage";
import LogoutButton from "./LogoutBtn";
import FourOhFourPage from "../../pages/404";

import { ThemeContext } from "../../context/ThemeContext";

import "./body.css";
import ProfileImageGallery from "../ProfileForm/Components/ProfileImageGallery";

const Body = () => {
  const REGISTER_URL = "/registration";

  const location = useLocation();

  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const userName = localStorage.getItem("username") ?? "";
  const accessToken = localStorage.getItem("accessToken") ?? "";

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

  return (
    <>
      <section className={`landing-page  ${isDarkMode ? "dark-mode" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profileimage"
            element={
              <ProfileImageGallery
                images={[
                  {
                    id: "As1",
                    url: "https://images.unsplash.com/photo-1687342780195-b72f82450dce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                    profilePhoto: true,
                  },
                  {
                    id: "As2",
                    url: "https://images.unsplash.com/photo-1687342780195-b72f82450dce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                    profilePhoto: false,
                  },
                  {
                    id: "As3",
                    url: "https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
                    profilePhoto: false,
                  },
                ]}
              />
            }
          />
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

          <Route path="*" element={<FourOhFourPage />} />
        </Routes>
      </section>
      <LogoutButton />
    </>
  );
};

export default Body;
