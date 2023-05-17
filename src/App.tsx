import Header from "./Components/Header";
import Body from "./Components/Body";

import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Body />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
