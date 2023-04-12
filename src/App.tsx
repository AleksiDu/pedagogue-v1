import Header from "./Components/Header";
import Body from "./Components/Body";

import "./App.css";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Body />
      </AuthProvider>
    </div>
  );
}

export default App;
