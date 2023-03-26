import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import Registration from "../../pages/Registration";

import "./styles.css";

const Body = () => {
  return (
    <div className="landing-page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration/*" element={<Registration />}></Route>
      </Routes>
    </div>
  );
};

export default Body;
