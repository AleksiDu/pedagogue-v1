import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import Profile from "../../pages/Profile";
import Home from "../../pages/home";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import { AuthContext } from "../../context/AuthProvider";

import "./styles.css";

const Body = () => {
  const REGISTER_URL = "/registration";
  const location = useLocation();

  const { auth } = useContext(AuthContext);

  console.log(auth);

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
