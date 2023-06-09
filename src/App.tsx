import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import { ScreenWidthProvider } from "./context/ScreenWidthContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScreenWidthProvider>
            <div className="App app-container">
              <Header />
              <Body />
              <Footer />
            </div>
          </ScreenWidthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
