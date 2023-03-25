import { Route, Routes } from "react-router-dom";
import Parent from "./Parent";
import Student from "./Student";
import Tutor from "./Tutor";
import NavBtn from "../../Components/RegistrationCom/NavBtn";

const Registration = () => {
  return (
    <div>
      <NavBtn name="Tutor" />
      <NavBtn name="Student" />
      <NavBtn name="Parent" />

      <Routes>
        <Route path="/Tutor" element={<Tutor />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Parent" element={<Parent />} />
      </Routes>
    </div>
  );
};

export default Registration;
