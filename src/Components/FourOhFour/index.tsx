import React, { useContext, useEffect, useState } from "react";

import notFoundLogo from "../../assets/404.svg";

import { ThemeContext } from "../../context/ThemeContext";

import "./styles.css";

const FourOhFour: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const { isDarkMode } = useContext(ThemeContext);
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
      <img
        alt="not found logo"
        src={notFoundLogo}
        className={
          isDarkMode ? "four-oh-four-img dark-mode-svg" : "four-oh-four-img"
        }
      />
      <div className="four-oh-four-text">
        <h1 className="typing-text">{displayText}</h1>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default FourOhFour;
