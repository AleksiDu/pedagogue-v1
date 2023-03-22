import { Route, Routes, useNavigate } from "react-router-dom";
import Parent from "./Parent";
import Student from "./Student";
import Tutor from "./Tutor";

const Registration = () => {
  const REGISTER_URL = `/registration`;
  const naviget = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          naviget(REGISTER_URL + "/Tutor");
        }}
      >
        Tutor
      </button>
      <button
        onClick={() => {
          naviget(REGISTER_URL + "/Student");
        }}
      >
        Student
      </button>
      <button
        onClick={() => {
          naviget(REGISTER_URL + "/Parent");
        }}
      >
        Parent
      </button>
      <Routes>
        <Route path="/Tutor" element={<Tutor />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Parent" element={<Parent />} />
      </Routes>
    </div>
  );
};

export default Registration;
