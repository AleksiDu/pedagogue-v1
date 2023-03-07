import Header from "./Components/Header";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/registration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
