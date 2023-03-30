import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../RegistrationLoginCom/LoginForm";
import Registration from "../../pages/Registration";

import "./styles.css";
import { useEffect } from "react";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <div className="landing-page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration/*" element={<Registration />}></Route>
        <Route path="/login/*" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default Body;
