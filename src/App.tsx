import Header from "./Components/Header";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Body from "./Components/Body";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Body />
      </BrowserRouter>
    </div>
  );
}

export default App;
