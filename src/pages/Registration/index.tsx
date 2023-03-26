import { Route, Routes } from "react-router-dom";
import NavBtn from "../../Components/RegistrationCom/NavBtn";
import RegisterForm from "../../Components/RegistrationCom/RegisterForm";

const Registration = () => {
  return (
    <div>
      <NavBtn name="Tutor" />
      <NavBtn name="Student" />
      <NavBtn name="Parent" />

      <Routes>
        <Route path="/Tutor" element={<RegisterForm name="Tutor" />} />
        <Route path="/Student" element={<RegisterForm name="Student" />} />
        <Route path="/Parent" element={<RegisterForm name="Parent" />} />
      </Routes>
    </div>
  );
};

export default Registration;
