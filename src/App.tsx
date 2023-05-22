import Header from "./Components/Header";
import Body from "./Components/Body";

import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("App isDarkMode", String(!isDarkMode));
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode === "true");
    }
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn !== null) {
      setIsLoggedIn(storedIsLoggedIn === "true");
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
      <AuthProvider>
        <Header isLoggedIn={isLoggedIn} />
        <Body
          onToggleMode={toggleMode}
          isDarkMode={isDarkMode}
          onLoginSuccess={handleLoginSuccess}
          isLoggedIn={isLoggedIn}
        />
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
