import React, { useEffect, useState } from "react";
import "./styles.css";
import notFoundLogo from "../../assets/404.svg";

const FourOhFour: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const text = "404 Page Not Found";

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex === text.length) {
        clearInterval(typingInterval);
        if (text.length > 18) {
          setTimeout(() => {
            setDisplayText("");
          }, 1000);
        }
        return;
      }

      setDisplayText(() => text.substring(0, currentIndex + 1));

      currentIndex++;
    }, 150);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="four-oh-four-container">
      <img alt="not found logo" src={notFoundLogo} />
      <h1 className="typing-text">{displayText}</h1>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

export default FourOhFour;
