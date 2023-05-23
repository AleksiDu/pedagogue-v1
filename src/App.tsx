import { useContext, useEffect } from "react";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";

import "./App.css";

import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.clear();
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode === "true");
    }
  }, []);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    // Set the timeout to clear localStorage after 24 hours (86400000 milliseconds)
    const timeout = setTimeout(clearLocalStorage, 86400000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`App app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <Header />
      <Body />
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default App;
