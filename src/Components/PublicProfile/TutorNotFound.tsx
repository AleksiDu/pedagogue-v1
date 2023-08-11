import TutorNotFoundLogo from "../../assets/Book4.svg";

const TutorNotFound = () => {
  return (
    <div>
      <img src={TutorNotFoundLogo} alt="book" />
      <h2>Tutor Not Found</h2>
      <p>The requested tutor could not be found.</p>
    </div>
  );
};

export default TutorNotFound;
