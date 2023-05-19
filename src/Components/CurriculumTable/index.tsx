import { Link } from "react-router-dom";
import "./styles.css";

const Curriculum = () => {
  // Example Data

  const schoolSubjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Literature",
    "Physical Education",
    "Art",
    "Music",
  ];

  return (
    <>
      <ul className="school-subjects">
        {schoolSubjects.map((subject) => (
          <li key={subject}>
            <Link to={`/curriculum/${subject}`}>{subject}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Curriculum;
