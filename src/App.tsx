import { useContext, useEffect } from "react";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import { ThemeContext } from "./context/ThemeContext";

import "./App.css";

function App() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

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
      <Footer />
    </div>
  );
}

export default App;
