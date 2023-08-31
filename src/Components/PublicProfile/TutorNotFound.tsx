import { useContext } from "react";
import TutorNotFoundLogo from "../../assets/Book4.svg";
import { ThemeContext } from "../../context/ThemeContext";

import "./tutorNotFoundStyles.css";

const TutorNotFound = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="tutor-not-found">
      <img
        src={TutorNotFoundLogo}
        alt="book"
        className={`${isDarkMode ? "darkMode" : ""}`}
      />
      <h2 className={`tutor-not-found ${isDarkMode ? "darkMode" : ""}`}>
        Tutor Not Found
      </h2>
      <p className={`tutor-not-found ${isDarkMode ? "darkMode" : ""}`}>
        The requested tutor could not be found.
      </p>
    </div>
  );
};

export default TutorNotFound;
