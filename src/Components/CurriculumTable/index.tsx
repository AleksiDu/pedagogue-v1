import { Link } from "react-router-dom";

import "./styles.css";

const Curriculum = () => {
  // Example Data

  let isDarkMode = "";

  if (localStorage.getItem("isDarkMode") === "true") {
    isDarkMode = "school-subjects dark-mode";
  } else {
    isDarkMode = "school-subjects";
  }
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
      <ul className={isDarkMode}>
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
