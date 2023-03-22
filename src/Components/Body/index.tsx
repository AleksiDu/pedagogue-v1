import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import Registration from "../../pages/Registration";
import Parent from "../../pages/Registration/Parent";
import Student from "../../pages/Registration/Student";
import Tutor from "../../pages/Registration/Tutor";
import "./styles.css";

const Body = () => {
  return (
    <div className="landing-page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration/*" element={<Registration />}>
          <Route path="Tutor" element={<Tutor />} />
          <Route path="Student" element={<Student />} />
          <Route path="Parent" element={<Parent />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Body;
