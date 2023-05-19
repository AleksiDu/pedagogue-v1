import Header from "./Components/Header";
import Body from "./Components/Body";

import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import Footer from "./Components/Footer";
import { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className={`App app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <AuthProvider>
        <Header />
        <Body onToggleMode={toggleMode} isDarkMode={isDarkMode} />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
