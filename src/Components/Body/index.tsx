import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";

import "./styles.css";
import { useEffect } from "react";
import Profile from "../../pages/Profile";

const Body = () => {
  const REGISTER_URL = "/registration";
  const location = useLocation();

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
    <section className="landing-page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration/*" element={<Registration />}></Route>
        <Route path="/login/*" element={<Login />}></Route>
        <Route path="/profile/*" element={<Profile />}></Route>
      </Routes>
    </section>
  );
};

export default Body;
