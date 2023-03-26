import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBtn from "../../Components/RegistrationCom/NavBtn";
import RegisterForm from "../../Components/RegistrationCom/RegisterForm";

const Registration = () => {
  const [activeBtn, setActiveBtn] = useState("");

  const handleBtnClick = (btnName: string) => {
    const newActiveBtn = activeBtn === btnName ? "" : btnName;
    setActiveBtn(newActiveBtn);
  };

  return (
    <div>
      <NavBtn name="Tutor" activeBtn={activeBtn} onClick={handleBtnClick} />
      <NavBtn name="Student" activeBtn={activeBtn} onClick={handleBtnClick} />
      <NavBtn name="Parent" activeBtn={activeBtn} onClick={handleBtnClick} />

      <Routes>
        <Route path="/Tutor" element={<RegisterForm name="Tutor" />} />
        <Route path="/Student" element={<RegisterForm name="Student" />} />
        <Route path="/Parent" element={<RegisterForm name="Parent" />} />
      </Routes>
    </div>
  );
};

export default Registration;
