import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Hash from "./components/hash";
import Study from "./components/Study";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Hash />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Study" element={<Study />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
