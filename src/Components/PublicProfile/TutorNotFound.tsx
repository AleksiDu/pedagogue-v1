import TutorNotFoundLogo from "../../assets/Book4.svg";

import "./tutorNotFoundStyles.css";

const TutorNotFound = () => {
  return (
    <div className="tutor-not-found">
      <img src={TutorNotFoundLogo} alt="book" />
      <h2 className="tutor-not-found">Tutor Not Found</h2>
      <p className="tutor-not-found">The requested tutor could not be found.</p>
    </div>
  );
};

export default TutorNotFound;
